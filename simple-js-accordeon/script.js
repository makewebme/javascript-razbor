+function () {

function initAccordeon () {
    var firstSectionBodyHeight = document.querySelector('.accordeon-section .accordeon-body > *').clientHeight
    document.querySelector('.accordeon-section .accordeon-body').style.maxHeight = firstSectionBodyHeight + 'px'
}

initAccordeon()



var accordeonHeaderClickHandler = function(e) {
    document.querySelectorAll('.accordeon-section').forEach(function(section) {
        section.querySelector('.accordeon-body').style.maxHeight = '0px'
    })

    var accordeonSection = e.target.closest('.accordeon-section')

    var insideElHeight = accordeonSection.querySelector('.accordeon-body > *').clientHeight

    accordeonSection.querySelector('.accordeon-body').style.maxHeight = insideElHeight + 'px'
}

document.querySelectorAll('.accordeon-section')
    .forEach(function(section) {
        section.addEventListener('click', accordeonHeaderClickHandler)
    })

}()