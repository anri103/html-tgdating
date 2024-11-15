// Preloader
(() => {
    const preloader = document.getElementById("preloader");

    const setPreloaderTransform = (value) => preloader.style.transform = `translateY(${value})`;

    // Скрываем прелоадер после загрузки страницы
    window.addEventListener('load', () => setTimeout(() => setPreloaderTransform('-100%'), 500));
})();


// Select Option
document.querySelectorAll('.select-option').forEach(option => {
	option.addEventListener('click', () => {
		const radioInput = option.querySelector('input[type="radio"]');

		if (!radioInput.checked) {
			document.querySelectorAll('.select-option.option-selected').forEach(it => it.classList.remove('option-selected'));
			radioInput.checked = true;
			option.classList.add('option-selected');
		}
	});
});

// Age Slider
(() => {
	const slider = document.getElementById('ageRangeSlider');
	if (!slider) return; // Проверка на наличие слайдера на странице

	const [inputMin, inputMax] = [document.getElementById('age-input-min'), document.getElementById('age-input-max')];

	noUiSlider.create(slider, {
		start: [20, 30],
		connect: true,
		range: { min: 18, max: 50 }
	});

	// Синхронизация с текстовыми полями
	const updateInputs = (values) => {
		[inputMin.value, inputMax.value] = values.map(Math.round);
	};

	slider.noUiSlider.on('update', updateInputs);

	const syncSlider = (input, index) => {
		input.addEventListener('change', () => {
			const values = [null, null];
			values[index] = input.value;
			slider.noUiSlider.set(values);
		});
	};

	syncSlider(inputMin, 0);
	syncSlider(inputMax, 1);
})();