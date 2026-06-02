

const today = new Date();
today.getFullYear();

document.getElementById('lastmodified').innerHTML = document.lastModified;

// ----show selected items that we are going to use----
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

const courseDetails = document.querySelector(`#course-details`);

// ----Toggle the show class off and on-----
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
})

// -----course modal details----
function displayCourseDetails(course) {
    if (!courseDetails) {
        return;
    }

    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal" aria-label="Close dialog">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    const closeModal = courseDetails.querySelector('#closeModal');
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            courseDetails.close();
        });
    }
}

if (courseDetails) {
    courseDetails.addEventListener('click', (event) => {
        const rect = courseDetails.getBoundingClientRect();
        const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!clickedInside) {
            courseDetails.close();
        }
    });
}


// ----Course Cards---

function createCourseCard(courseList) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';

    courseList.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('card');

        if (course.completed) {
            card.classList.add('completed');
        }
        card.textContent = `${course.subject} ${course.number}`;
        card.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        cardsContainer.appendChild(card);
    });

    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    const creditLine = document.createElement('p');
    creditLine.classList.add('credit-total');
    creditLine.textContent = `The total credits for courses listed above is:  ${totalCredits}`;
    cardsContainer.appendChild(creditLine);
}

// -----all-----
const allLink = document.querySelector('#all');
allLink.addEventListener('click', () => {
    createCourseCard(courses);
});

// -----cse-----
const cseLink = document.querySelector('#cse');
cseLink.addEventListener('click', () => {
    const filteredCourses = courses.filter(course => course.subject === 'CSE');
    createCourseCard(filteredCourses);
});

// -----wdd-----
const wddLink = document.querySelector('#wdd');
wddLink.addEventListener('click', () => {
    const filteredCourses = courses.filter(course => course.subject === 'WDD');
    createCourseCard(filteredCourses);
});




// -----course list array-----
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

createCourseCard(courses);