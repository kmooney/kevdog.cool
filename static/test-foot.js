!function() {
	const grabbers = document.querySelectorAll(".grabber");
	const body = document.querySelector("body");

	let Copier = class {
		constructor(v, startX, startY) {
			this._value = v;
			this._targets = [];
			this._inputs = [];
			this._length = 0;
			this.el = document.createElement("div");
			this.el.classList.add("lasso");
			body.appendChild(this.el);
			this.x = 0;
			this.y = 0;
			this.height = 0;
			this.width = 0;

			document.addEventListener("mousemove", (e) => {
				let width = e.clientX - startX;
				let height = e.clientY - startY;
				if (width >= 0) {
					this.el.style.left = startX + "px";
					this.el.style.width = width + "px";

					this.x = startX;
					this.width = width;
				} else {
					this.el.style.left = e.clientX + "px";
					this.el.style.width = -width + "px";

					this.x = e.clientX;
					this.width = -width;
				}
				if (height >= 0) {
					this.el.style.top = this.el.ownerDocument.defaultView.pageYOffset + startY + "px";
					this.el.style.height = height + "px";

					this.y = startY;
					this.height = height;
				} else {
					this.el.style.top = this.el.ownerDocument.defaultView.pageYOffset + e.clientY + "px";
					this.el.style.height = -height + "px";

					this.y = e.clientY;
					this.height = -height;
				}
			});

			// i wanted to use an intersectionobserver for this,
			// but it requires my lasso be an ancestor of everything else.
			// gross :(

			// let this be an option - pass in the copier.
			let copies = document.querySelectorAll(".copier");
			this.interval = window.setInterval(() => {
				copies.forEach((c) => {
					let r = c.getBoundingClientRect();
					let i = !(r.x > this.x + this.width || r.x + r.width < this.x || r.y > this.y + this.height || r.y + r.height < this.y);
					if (i) {
						this.addTarget(c);
					} else {
						this.removeTarget(c);
					}
				});
			}, 250)

		}

		addTarget(t) {
			t.classList.add("highlighted");
			let i = t.querySelector("input");
			if (this._targets.indexOf(t) == -1) {
				this._targets.push(t);
			}
			if (this._inputs.indexOf(i) == -1) {
				this._inputs.push(t.querySelector("input"));
			}
		}

		removeTarget(t) {
			t.classList.remove("highlighted");
			let input =	t.querySelector("input");
			let idx = this._targets.indexOf(t);
			if (idx !== -1) {
				this._targets.splice(idx, 1);
			}
			idx = this._inputs.indexOf(input);
			if (idx !== -1) {
				this._inputs.splice(idx, 1);
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
			body.removeChild(this.el);
			window.clearInterval(this.interval);
		}
	}

	let copier = null;
	let curIdx = 0;

	function registerGrabber(handle) {
		let inputEl = handle.parentElement.querySelector("input");
		let targetEl = handle.parentElement.parentElement;
		targetEl.id = curIdx++;

		handle.addEventListener('mousedown', (e) => {
			copier = new Copier(inputEl.value, e.clientX, e.clientY);
			e.preventDefault();
		});

		targetEl.addEventListener('mouseover', (e) => {
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
			copier = null;
		}
	});
}();