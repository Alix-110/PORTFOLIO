#!/usr/bin/env python3
"""
Space Data Sonification Script
Converts numerical CSV data about space into an audio representation.
This script reads space data, maps values to sound parameters, and generates a WAV file.
"""

import pandas as pd
import numpy as np
from scipy.io import wavfile
import math

def read_csv_data(filename):
    """
    Step 1: Read CSV data from a file
    This function reads space-related numerical data from a CSV file.
    We assume the CSV has columns with numerical values representing space measurements.
    """
    print("Reading CSV data...")
    
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(filename)
    
    # Display basic information about the data
    print(f"Dataset shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    print(f"First few rows:\n{df.head()}")
    
    return df

def normalize_data(df):
    """
    Step 2: Normalize the data
    Converts all numerical values to a 0-1 range for easier mapping to sound parameters.
    """
    print("\nNormalizing data to 0-1 range...")
    
    # Create a copy to avoid modifying the original
    normalized_df = df.copy()
    
    # Normalize each numerical column
    for column in normalized_df.select_dtypes(include=[np.number]).columns:
        min_val = normalized_df[column].min()
        max_val = normalized_df[column].max()
        
        # Avoid division by zero
        if max_val > min_val:
            normalized_df[column] = (normalized_df[column] - min_val) / (max_val - min_val)
        else:
            normalized_df[column] = 0.5  # Default value if all values are the same
    
    print("Normalization complete.")
    return normalized_df

def map_to_sound_parameters(normalized_df):
    """
    Step 3: Map normalized data to sound parameters
    Converts numerical values to pitch, duration, volume, and stereo panning.
    """
    print("\nMapping data to sound parameters...")
    
    # Extract the first numerical column for demonstration
    # In a real application, you might use multiple columns
    numerical_columns = normalized_df.select_dtypes(include=[np.number]).columns
    
    if len(numerical_columns) == 0:
        raise ValueError("No numerical columns found in the CSV data")
    
    # Use the first numerical column for sonification
    data_column = numerical_columns[0]
    data_values = normalized_df[data_column].values
    
    sound_parameters = {
        'pitches': [],
        'durations': [],
        'volumes': [],
        'pan_positions': []
    }
    
    # Map each data point to sound parameters
    for i, value in enumerate(data_values):
        # Pitch: Map to a musical scale (C4 to C6, approximately 261.63 to 1046.5 Hz)
        # Using a pentatonic scale for pleasant sound
        pitch_scale = [0, 2, 4, 7, 9]  # Pentatonic scale intervals (in semitones)
        pitch_index = int(value * (len(pitch_scale) - 1))
        pitch_semitones = pitch_scale[pitch_index]
        
        # Base frequency for C4
        base_freq = 261.63
        # Calculate frequency using semitone formula: f = f0 * 2^(n/12)
        pitch = base_freq * (2 ** (pitch_semitones / 12))
        
        # Duration: Longer for higher values
        duration = 0.1 + (value * 0.3)  # 0.1 to 0.4 seconds
        
        # Volume: Louder for higher values
        volume = 0.3 + (value * 0.7)  # 0.3 to 1.0
        
        # Stereo panning: Alternate left/right based on position
        pan_position = -1 if i % 2 == 0 else 1  # -1 = left, 1 = right
        
        sound_parameters['pitches'].append(pitch)
        sound_parameters['durations'].append(duration)
        sound_parameters['volumes'].append(volume)
        sound_parameters['pan_positions'].append(pan_position)
    
    print(f"Mapped {len(data_values)} data points to sound parameters.")
    return sound_parameters

def generate_audio_waveform(sound_parameters, sample_rate=44100):
    """
    Step 4: Generate audio waveform from sound parameters
    Creates a waveform by combining sine waves for each data point.
    """
    print("\nGenerating audio waveform...")
    
    # Initialize an empty array for the audio data
    # We'll use stereo (2 channels)
    total_duration = sum(sound_parameters['durations'])
    total_samples = int(total_duration * sample_rate)
    audio_data = np.zeros((total_samples, 2), dtype=np.float32)
    
    current_sample = 0
    
    # Generate audio for each data point
    for i in range(len(sound_parameters['pitches'])):
        pitch = sound_parameters['pitches'][i]
        duration = sound_parameters['durations'][i]
        volume = sound_parameters['volumes'][i]
        pan_position = sound_parameters['pan_positions'][i]
        
        # Calculate the number of samples for this tone
        num_samples = int(duration * sample_rate)
        
        # Create a time array for this tone
        t = np.linspace(0, duration, num_samples, endpoint=False)
        
        # Generate a sine wave for this tone
        tone = np.sin(2 * np.pi * pitch * t)
        
        # Apply volume envelope (fade in/out to avoid clicks)
        envelope = np.ones(num_samples)
        fade_samples = min(100, num_samples // 10)
        envelope[:fade_samples] = np.linspace(0, 1, fade_samples)
        envelope[-fade_samples:] = np.linspace(1, 0, fade_samples)
        
        tone = tone * envelope * volume
        
        # Apply panning to stereo channels
        # pan_position: -1 = fully left, 0 = center, 1 = fully right
        left_gain = 1.0 if pan_position < 0 else 1.0 - pan_position
        right_gain = 1.0 if pan_position > 0 else 1.0 + pan_position
        
        # Ensure gains are in valid range
        left_gain = max(0, min(1, left_gain))
        right_gain = max(0, min(1, right_gain))
        
        # Add the tone to the audio data
        end_sample = current_sample + num_samples
        
        # Make sure we don't exceed array bounds
        if end_sample <= total_samples:
            audio_data[current_sample:end_sample, 0] += tone * left_gain
            audio_data[current_sample:end_sample, 1] += tone * right_gain
        
        current_sample += num_samples
    
    # Normalize the audio to prevent clipping
    max_amplitude = np.max(np.abs(audio_data))
    if max_amplitude > 0:
        audio_data = audio_data / max_amplitude
    
    print(f"Generated {total_duration:.2f} seconds of audio at {sample_rate} Hz sample rate.")
    return audio_data, sample_rate

def save_audio_file(audio_data, sample_rate, filename="space_sonification.wav"):
    """
    Step 5: Save the audio data to a WAV file
    """
    print(f"\nSaving audio to {filename}...")
    
    # Convert float32 to int16 for WAV file format
    audio_int16 = (audio_data * 32767).astype(np.int16)
    
    # Write to WAV file
    wavfile.write(filename, sample_rate, audio_int16)
    
    print(f"Audio file saved successfully: {filename}")

def main():
    """
    Main function that executes the complete sonification workflow.
    """
    print("=" * 60)
    print("SPACE DATA SONIFICATION TOOL")
    print("=" * 60)
    
    # Configuration
    csv_filename = "simulations.csv"
    output_filename = "space_sonification.wav"
    
    try:
        # Step 1: Read CSV data
        df = read_csv_data(csv_filename)
        
        # Step 2: Normalize the data
        normalized_df = normalize_data(df)
        
        # Step 3: Map data to sound parameters
        sound_parameters = map_to_sound_parameters(normalized_df)
        
        # Step 4: Generate audio waveform
        audio_data, sample_rate = generate_audio_waveform(sound_parameters)
        
        # Step 5: Save audio file
        save_audio_file(audio_data, sample_rate, output_filename)
        
        print("\n" + "=" * 60)
        print("SONIFICATION COMPLETE!")
        print(f"Created: {output_filename}")
        print("=" * 60)
        
        # Print example mapping for educational purposes
        print("\nExample data-to-sound mapping:")
        print("Data Value -> Pitch (Hz) -> Duration (s) -> Volume -> Pan")
        for i in range(min(5, len(sound_parameters['pitches']))):
            original_value = df.iloc[i, 0] if i < len(df) else 0
            print(f"{original_value:.2f} -> {sound_parameters['pitches'][i]:.1f} Hz -> "
                  f"{sound_parameters['durations'][i]:.2f} s -> "
                  f"{sound_parameters['volumes'][i]:.2f} -> "
                  f"{'Left' if sound_parameters['pan_positions'][i] < 0 else 'Right'}")
        
    except FileNotFoundError:
        print(f"\nERROR: Could not find '{csv_filename}'.")
        print("Please ensure the CSV file exists in the same directory as this script.")
        print("\nCreating a sample space dataset for demonstration...")
        create_sample_dataset()
        
        # Try again with the sample dataset
        df = read_csv_data(csv_filename)
        normalized_df = normalize_data(df)
        sound_parameters = map_to_sound_parameters(normalized_df)
        audio_data, sample_rate = generate_audio_waveform(sound_parameters)
        save_audio_file(audio_data, sample_rate, output_filename)
        
        print("\nGenerated sample sonification from created dataset.")
    
    except Exception as e:
        print(f"\nERROR: An unexpected error occurred: {e}")

def create_sample_dataset():
    """
    Creates a sample space dataset if no CSV file is found.
    This simulates measurements from a space telescope or satellite.
    """
    print("Creating sample space dataset...")
    
    # Create sample data - could represent planetary temperatures, star brightness, etc.
    np.random.seed(42)  # For reproducible results
    
    # Generate sample data
    num_samples = 50
    time = np.linspace(0, 24, num_samples)  # 24-hour period
    temperature = 100 + 50 * np.sin(2 * np.pi * time / 24) + np.random.normal(0, 5, num_samples)
    brightness = 500 + 200 * np.sin(2 * np.pi * time / 12) + np.random.normal(0, 20, num_samples)
    radiation = 10 + 5 * np.sin(2 * np.pi * time / 8) + np.random.normal(0, 1, num_samples)
    
    # Create a DataFrame
    data = {
        'time_hours': time,
        'temperature_k': temperature,
        'brightness_lum': brightness,
        'radiation_sv': radiation
    }
    
    df = pd.DataFrame(data)
    
    # Save to CSV
    df.to_csv("space_data.csv", index=False)
    print("Sample dataset saved as 'space_data.csv'")
    print(f"Columns: {list(df.columns)}")
    print(f"Sample values:\n{df.head()}")

if __name__ == "__main__":
    main()