!function() {
	const grabbers = document.querySelectorAll(".grabber");
	const body = document.querySelector("body");

	const MOUSEDOWN = 0;
	const MOUSEUP = 1

	let Copier = class {
		constructor(v) {
			this._value = v;
			this._targets = [];
			this._inputs = [];
			this._length = 0;
		}

		addTarget(t, i) {
			if (t != this._targets[this._length - 1]) {
				// if it's at len-2, remove the most recently added one.
				if (this._length > 1 && t == this._targets[this._length - 2]) {
					const x = this._targets.pop();
					this._inputs.pop();
					x.classList.remove("highlighted");
					this._length = this._targets.length;

				} else {
					this._targets.push(t);
					this._inputs.push(i);
					this._length = this._targets.length;
				}
			}
		}

		finalize() {
			this._inputs.forEach(input => {
				input.value = this._value;
			});
			this._targets.forEach(target => {
				target.classList.remove("highlighted");
			});
			this._targets = [];
			this._inputs = [];
		}
	}

	let copier = null;
	let mouseState = MOUSEUP;
	let curIdx = 0;

	function registerGrabber(handle) {
		let inputEl = handle.parentElement.querySelector("input");
		let targetEl = handle.parentElement.parentElement;
		targetEl.id = curIdx++;

		handle.addEventListener('mousedown', (e) => {
			mouseState = MOUSEDOWN;
			copier = new Copier(inputEl.value);
			e.preventDefault();
		});

		targetEl.addEventListener('mouseover', (e) => {
			if (mouseState == MOUSEDOWN) {
				targetEl.classList.add("highlighted");
				copier.addTarget(targetEl, inputEl);
			}
			handle.classList.add("show");
		});
		
		targetEl.addEventListener('mouseout', (e) => {
			handle.classList.remove("show");
		});
	}


	grabbers.forEach(g => registerGrabber(g));
	document.addEventListener("mouseup", (e) => {
		if (e.buttons == 0 && copier) {
			copier.finalize();
			mouseState = MOUSEUP;
			copier = null;
		}
	});
}();