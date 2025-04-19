// Scripts para home.html
$(document).ready(function() {
    // Animación del hero content
    $('.hero-content').fadeIn(1500);

    // Animación de las tarjetas
    $('.card').each(function(index) {
        $(this).delay(index * 200).fadeIn(1000);
    });

    // Contador animado
    function animateCounter() {
        $('.counter').each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).data('target')
            }, {
                duration: 2000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

    // Iniciar contador cuando el elemento es visible
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    var counterAnimated = false;
    $(window).scroll(function() {
        if (!counterAnimated && isElementInViewport($('.counter')[0])) {
            animateCounter();
            counterAnimated = true;
        }
    });

    // Configuración del carrusel de testimonios
    var testimonialCarousel = new bootstrap.Carousel(document.getElementById('testimonialCarousel'), {
        interval: 5000,
        pause: 'hover',
        wrap: true
    });

    // Efecto de hover en las tarjetas
    $('.card').hover(
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1)');
        }
    );

    // Validación del formulario de newsletter
    $('#newsletterForm').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitButton = form.find('button[type="submit"]');
        const buttonText = submitButton.find('.button-text');
        const spinner = submitButton.find('.spinner-border');
        
        // Validación de email
        const email = form.find('input[type="email"]').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            form.find('input[type="email"]').addClass('is-invalid');
            return;
        }
        
        // Mostrar spinner y deshabilitar botón
        buttonText.text('Enviando...');
        spinner.removeClass('d-none');
        submitButton.prop('disabled', true);
        
        // Simular envío del formulario
        setTimeout(function() {
            // Ocultar spinner y restaurar botón
            spinner.addClass('d-none');
            submitButton.prop('disabled', false);
            buttonText.text('Suscribirse');
            
            // Resetear formulario
            form[0].reset();
            
            // Mostrar mensaje de éxito
            const successMessage = $('<div class="alert alert-success mt-3">')
                .text('¡Gracias por suscribirte!')
                .hide()
                .appendTo(form);
            
            successMessage.fadeIn().delay(3000).fadeOut(function() {
                $(this).remove();
            });
        }, 2000);
    });
});

// Scripts para prices.html
$(document).ready(function() {
    // Inicializar tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Cambiar precios entre mensual y anual
    $('#togglePlan').on('change', function() {
        const isAnnual = $(this).is(':checked');
        $('#priceHeader').text(isAnnual ? 'Precio Anual' : 'Precio Mensual');
        
        $('.price-cell').each(function() {
            const price = isAnnual ? $(this).data('annual') : $(this).data('monthly');
            $(this).text(`$${price}`);
        });
    });

    // Resaltar fila seleccionada
    $('.select-plan').on('click', function() {
        const row = $(this).closest('tr');
        $('.price-table tbody tr').removeClass('selected');
        row.addClass('selected');
        
        // Mostrar mensaje de confirmación
        const plan = $(this).data('plan');
        alert(`Has seleccionado el plan ${plan}. ¡Gracias por tu elección!`);
    });

    // Efecto hover en las filas
    $('.price-table tbody tr').hover(
        function() {
            $(this).find('.price-cell').css('color', '#007bff');
        },
        function() {
            if (!$(this).hasClass('selected')) {
                $(this).find('.price-cell').css('color', '');
            }
        }
    );
});

// Scripts para trainers.html
$(document).ready(function() {
    // Animación de las barras de habilidades
    $('.skill-progress').each(function() {
        const skillValue = $(this).data('skill');
        $(this).css('width', '0%').animate({
            width: skillValue + '%'
        }, 1500);
    });

    // Sistema de rating
    $('.rating input').on('change', function() {
        const ratingValue = $(this).val();
        const ratingContainer = $(this).closest('.rating');
        ratingContainer.find('.rating-value').text(ratingValue);
        
        // Guardar la calificación (podrías enviar esto a un servidor)
        const trainerId = ratingContainer.data('trainer');
        console.log(`Calificación para entrenador ${trainerId}: ${ratingValue} estrellas`);
    });

    // Efecto hover en las tarjetas
    $('.trainer-card').hover(
        function() {
            $(this).find('.trainer-card-inner').css('transform', 'rotateY(180deg)');
        },
        function() {
            $(this).find('.trainer-card-inner').css('transform', 'rotateY(0deg)');
        }
    );
});

// Scripts para clases.html
$(document).ready(function() {
    // Inicializar Masonry
    var $grid = $('.masonry').masonry({
        itemSelector: '.class-card',
        columnWidth: '.class-card',
        percentPosition: true,
        gutter: 20
    });

    // Filtros con jQuery
    $('.filter-checkbox').on('change', function() {
        var selectedCategories = [];
        $('.filter-checkbox:checked').each(function() {
            selectedCategories.push($(this).attr('id').replace('filter', '').toLowerCase());
        });

        $('.class-card').each(function() {
            var category = $(this).data('category');
            if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        // Reorganizar Masonry después de filtrar
        $grid.masonry('layout');
    });

    // Efecto hover en tarjetas
    $('.class-card').hover(
        function() {
            $(this).find('.class-overlay').fadeIn(300);
        },
        function() {
            $(this).find('.class-overlay').fadeOut(300);
        }
    );

    // Validación del formulario de newsletter
    $('#newsletterForm').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitButton = form.find('button[type="submit"]');
        const buttonText = submitButton.find('.button-text');
        const spinner = submitButton.find('.spinner-border');
        
        // Validación de email
        const email = form.find('input[type="email"]').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            form.find('input[type="email"]').addClass('is-invalid');
            return;
        }
        
        // Mostrar spinner y deshabilitar botón
        buttonText.text('Enviando...');
        spinner.removeClass('d-none');
        submitButton.prop('disabled', true);
        
        // Simular envío del formulario
        setTimeout(function() {
            // Ocultar spinner y restaurar botón
            spinner.addClass('d-none');
            submitButton.prop('disabled', false);
            buttonText.text('Suscribirse');
            
            // Resetear formulario
            form[0].reset();
            
            // Mostrar mensaje de éxito
            const successMessage = $('<div class="alert alert-success mt-3">')
                .text('¡Gracias por suscribirte!')
                .hide()
                .appendTo(form);
            
            successMessage.fadeIn().delay(3000).fadeOut(function() {
                $(this).remove();
            });
        }, 2000);
    });
});

// Scripts para el formulario de contacto
$(document).ready(function() {
    // Validación en tiempo real
    $('#contactForm input, #contactForm select, #contactForm textarea').on('input', function() {
        if (this.checkValidity()) {
            $(this).removeClass('is-invalid').addClass('is-valid');
        } else {
            $(this).removeClass('is-valid').addClass('is-invalid');
        }
    });

    // Manejo del envío del formulario
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        if (this.checkValidity()) {
            // Mostrar spinner
            $('.spinner-container').fadeIn();
            $('.submit-text').hide();
            $('.spinner-border').removeClass('d-none');
            
            // Simular envío (reemplazar con tu lógica real de envío)
            setTimeout(function() {
                // Ocultar spinner
                $('.spinner-container').fadeOut();
                $('.submit-text').show();
                $('.spinner-border').addClass('d-none');
                
                // Mostrar modal de confirmación
                $('#confirmationModal').modal('show');
                
                // Resetear formulario
                $('#contactForm')[0].reset();
                $('#contactForm input, #contactForm select, #contactForm textarea').removeClass('is-valid is-invalid');
            }, 2000);
        }
    });

    // Cerrar modal y resetear formulario
    $('#confirmationModal').on('hidden.bs.modal', function() {
        $('#contactForm')[0].reset();
        $('#contactForm input, #contactForm select, #contactForm textarea').removeClass('is-valid is-invalid');
    });
});

// Scripts para blog.html
$(document).ready(function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Filtros
    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.featured-article, .regular-article').show();
        } else {
            $('.featured-article, .regular-article').hide();
            $(`.featured-article[data-category="${filter}"], .regular-article[data-category="${filter}"]`).show();
        }
    });

    // Sistema de likes
    $('.like-btn').on('click', function() {
        $(this).toggleClass('btn-outline-primary btn-primary');
    });

    // Sistema de respuestas
    $('.reply-btn').on('click', function() {
        const replyForm = $(this).closest('.comment-content').find('.reply-form');
        replyForm.slideToggle();
    });

    // Enviar respuesta
    $('.reply-form').on('submit', function(e) {
        e.preventDefault();
        const replyText = $(this).find('textarea').val();
        if (replyText.trim() !== '') {
            const newReply = $('<div class="comment mt-3">')
                .append($('<div class="comment-avatar">').text('Tú'))
                .append($('<div class="comment-content">')
                    .append($('<h5>').text('Tú'))
                    .append($('<p>').text(replyText)));
            
            $(this).before(newReply);
            $(this).find('textarea').val('');
            $(this).slideUp();
        }
    });
});