const Resume = document.getElementById("resume");
const JobAdd = document.getElementById("job_add");
const Application = document.getElementById("application");


document.addEventListener('DOMContentLoaded', createFormEventListener);

let form;

function createFormEventListener() {
    form = document.getElementById('application_form');
    form.addEventListener('submit', handleSubmitForm);
}

async function handleSubmitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    try {
        const formData = new FormData(form);
        await postAndPutFormDataAsJson(url, formData);
    } catch (error) {
        alert(error.message);
    }
}

async function postAndPutFormDataAsJson(url, formData) {
    const formDataAsObject = Object.fromEntries(formData.entries());
    formDataAsObject.resume = Resume.value;
    formDataAsObject.jobAdd = JobAdd.value;
    let response;

    response = await postOrPutObjectAsJson(url, formDataAsObject);
    if (response.ok) {
        const data = await response.json();
        Application.value = data['answer'];
        alert('Application generated');
    }
}

async function postOrPutObjectAsJson(url, object) {
    const fetchOption = {
        method: 'Post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(object)
    }
    const response = await fetch(url, fetchOption);
    return response;
}