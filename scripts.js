function toggleDropdown(id) {
    var element = document.getElementById(id);
    var header = element.previousElementSibling; // Assuming the header is immediately before the content
    var arrow = header.querySelector('.arrow');
    
    if (element.classList.contains('show')) {
        element.classList.remove('show');
        element.classList.add('hide');
        arrow.classList.remove('up');
    } else {
        element.classList.remove('hide');
        element.classList.add('show');
        arrow.classList.add('up');
    }
}

