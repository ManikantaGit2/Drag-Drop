// script.js
const list = document.getElementById("sortable-list");
let draggedItem = null;

document.querySelectorAll(".draggable").forEach(item => {
    item.addEventListener("dragstart", () => {
        draggedItem = item;
        item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
        draggedItem = null;
        item.classList.remove("dragging");
    });
});

list.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(list, event.clientY);
    if (draggedItem) {
        if (afterElement == null) {
            list.appendChild(draggedItem);
        } else {
            list.insertBefore(draggedItem, afterElement);
        }
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}