const object1 = document.getElementById('object1');
const object2 = document.getElementById('object2');
const object3 = document.getElementById('object3');
const shadow1 = document.getElementById('shadow1');
const shadow2 = document.getElementById('shadow2');
const shadow3 = document.getElementById('shadow3');
const checkSolutionBtn = document.getElementById('checkSolution');
const message = document.getElementById('message');

// Positions for object placement
let objectPositions = {
    object1: { left: 50, top: 50 },
    object2: { left: 150, top: 100 },
    object3: { left: 250, top: 150 }
};

// Make objects draggable
[object1, object2, object3].forEach(object => {
    object.draggable = true;

    object.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

// Allow dropping of objects
[shadow1, shadow2, shadow3].forEach(shadow => {
    shadow.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    shadow.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedObjectId = e.dataTransfer.getData('text');
        const draggedObject = document.getElementById(draggedObjectId);
        
        // Move the object to the shadow location
        const rect = shadow.getBoundingClientRect();
        draggedObject.style.position = 'absolute';
        draggedObject.style.left = `${rect.left + 25}px`; // Adjust to center over shadow
        draggedObject.style.top = `${rect.top + 25}px`;
    });
});

// Check if the solution is correct
checkSolutionBtn.addEventListener('click', () => {
    if (
        checkShadowPosition(shadow1, object1) &&
        checkShadowPosition(shadow2, object2) &&
        checkShadowPosition(shadow3, object3)
    ) {
        message.textContent = 'Correct! The shadows align perfectly!';
    } else {
        message.textContent = 'Try again. The shadows do not align correctly.';
    }
});

// Helper function to check if object is in correct shadow position
function checkShadowPosition(shadow, object) {
    const shadowRect = shadow.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    return (
        Math.abs(shadowRect.left - objectRect.left) < 20 &&
        Math.abs(shadowRect.top - objectRect.top) < 20
    );
}
