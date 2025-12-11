const quizContainer = document.getElementById("quizContainer");
const cvContainer = document.getElementById("cvContainer");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answerInput");
const picInput = document.getElementById("picInput");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");
const addBtn = document.getElementById("addBtn");
const cvContent = document.getElementById("cvContent");
const restartBtn = document.getElementById("restartBtn");


let userData = {
    name: "", title: "", bio: "", email: "", phone: "", linkedin: "", github: "",
    skills: "", languages: "", education: [], experience: [], projects: [],
    certifications: "", hobbies: "", picture: ""
};

let step = 0;
let addingMultiple = false; // for projects or experience

const stepsData = [
    {q:"What's your full name?", type:"text", key:"name", color:"#ffeb3b"},
    {q:"Professional title?", type:"text", key:"title", color:"#03a9f4"},
    {q:"Short bio about yourself?", type:"textarea", key:"bio", color:"#8bc34a"},
    {q:"Email?", type:"text", key:"email", color:"#ff9800"},
    {q:"Phone number?", type:"text", key:"phone", color:"#e91e63"},
    {q:"LinkedIn URL?", type:"text", key:"linkedin", color:"#9c27b0"},
    {q:"GitHub/Portfolio URL?", type:"text", key:"github", color:"#3f51b5"},
    {q:"Skills (comma-separated)?", type:"text", key:"skills", color:"#4caf50"},
    {q:"Languages known (comma-separated)?", type:"text", key:"languages", color:"#ff5722"},
    {q:"Add education details (Degree | School | Year | Extra)?", type:"text", key:"education", color:"#00bcd4"},
    {q:"Add work experience (Title | Company | Duration | Description)?", type:"text", key:"experience", color:"#cddc39"},
    {q:"Add project name", type:"text", key:"projects", color:"#e91e63"},
    {q:"Upload profile picture", type:"file", key:"picture", color:"#9c27b0"},
    {q:"Certifications (comma-separated)?", type:"text", key:"certifications", color:"#ff9800"},
    {q:"Hobbies / Interests?", type:"text", key:"hobbies", color:"#8bc34a"}
];

// Initialize
updateStep();

// Next button
nextBtn.addEventListener("click", handleNext);
skipBtn.addEventListener("click", handleSkip);
addBtn.addEventListener("click", handleAddAnother);
restartBtn.addEventListener("click", handleRestart);

function handleNext(){
    const currentStep = stepsData[step];

    if(currentStep.type==="file"){
        if(picInput.files.length===0){ alert("Please upload a picture!"); return; }
        const reader = new FileReader();
        reader.onload = function(e){ userData.picture = e.target.result; showNextStep(); };
        reader.readAsDataURL(picInput.files[0]);
        return;
    }

    let value = answerInput.value.trim();
    if(currentStep.key==="projects" || currentStep.key==="experience" || currentStep.key==="education"){
        if(value){
            userData[currentStep.key].push(value);
            addingMultiple = true;
            answerInput.value = "";
            questionEl.textContent = "Add another or click Skip to continue";
            addBtn.style.display = "inline-block";
            skipBtn.style.display = "inline-block";
            return;
        } else if(addingMultiple){
            showNextStep();
            addBtn.style.display = "none";
            skipBtn.style.display = "none";
            addingMultiple = false;
            return;
        } else {
            alert("Please add at least one entry!");
            return;
        }
    }

    if(!value){ alert("Please provide input!"); return; }
    userData[currentStep.key] = value;
    showNextStep();
}

function handleSkip(){ showNextStep(); addBtn.style.display="none"; skipBtn.style.display="none"; addingMultiple=false; }

function handleAddAnother(){ handleNext(); }

function handleRestart(){
    cvContainer.style.display="none";
    quizContainer.style.display="block";
    userData={name:"", title:"", bio:"", email:"", phone:"", linkedin:"", github:"",
              skills:"", languages:"", education:[], experience:[], projects:[],
              certifications:"", hobbies:"", picture:""};
    step=0; addingMultiple=false;
    answerInput.value=""; picInput.value=""; addBtn.style.display="none"; skipBtn.style.display="none";
    updateStep();
}

function updateStep(){
    const currentStep = stepsData[step];
    document.body.style.background=currentStep.color;
    answerInput.style.display = currentStep.type!=="file" ? "block":"none";
    answerInput.value="";
    picInput.style.display = currentStep.type==="file" ? "block":"none";
    questionEl.textContent = currentStep.q;
}

function showNextStep(){
    step++;
    if(step>=stepsData.length){ generateCV(); return; }
    updateStep();
}

function generateCV(){
    quizContainer.style.display="none";
    cvContainer.style.display="block";

    let html=`<div class="cv-content">`;
    if(userData.picture) html+=`<img src="${userData.picture}" alt="Profile Picture">`;
    html+=`<div class="cv-section"><h2>${userData.name}</h2><p>${userData.title}</p></div>`;
    html+=`<div class="cv-section"><h3>Bio</h3><p>${userData.bio}</p></div>`;
    html+=`<div class="cv-section"><h3>Contact</h3>
           <p>Email: ${userData.email}</p>
           <p>Phone: ${userData.phone}</p>
           <p>LinkedIn: ${userData.linkedin}</p>
           <p>GitHub: ${userData.github}</p></div>`;
    html+=`<div class="cv-section"><h3>Skills</h3><p>${userData.skills}</p></div>`;
    html+=`<div class="cv-section"><h3>Languages</h3><p>${userData.languages}</p></div>`;

    if(userData.education.length>0){
        html+=`<div class="cv-section"><h3>Education</h3>`;
        userData.education.forEach((ed,i)=>{ html+=`<div class="project-card">${i+1}. ${ed}</div>`; });
        html+=`</div>`;
    }

    if(userData.experience.length>0){
        html+=`<div class="cv-section"><h3>Work Experience</h3>`;
        userData.experience.forEach((ex,i)=>{ html+=`<div class="work-card">${i+1}. ${ex}</div>`; });
        html+=`</div>`;
    }

    if(userData.projects.length>0){
        html+=`<div class="cv-section"><h3>Projects</h3>`;
        userData.projects.forEach((p,i)=>{ html+=`<div class="project-card">${i+1}. ${p}</div>`; });
        html+=`</div>`;
    }

    if(userData.certifications){ html+=`<div class="cv-section"><h3>Certifications</h3><p>${userData.certifications}</p></div>`; }
    if(userData.hobbies){ html+=`<div class="cv-section"><h3>Hobbies</h3><p>${userData.hobbies}</p></div>`; }

    html+=`</div>`;
    cvContent.innerHTML=html;
}
