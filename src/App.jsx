import { useEffect } from "react";

function App() {
	useEffect(() => {
		let totalRotation = 0;
		const header = document.querySelector("#second-section h1");
		let previousScrollTop = document.documentElement.scrollTop;
		function handleScroll() {
			const currentScrollTop = document.documentElement.scrollTop;
			let direction = currentScrollTop - previousScrollTop > 0 ? 1 : -1;

			totalRotation += 10 * direction;
			header.style.transform = `rotate(${totalRotation}deg)`;
			previousScrollTop = document.documentElement.scrollTop;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						window.addEventListener("scroll", handleScroll);
					} else {
						window.removeEventListener("scroll", handleScroll);
					}
				});
			},
			{
				threshold: 0.9,
			}
		);
		observer.observe(document.querySelector("#actual-content"));
		return () => {
			observer.unobserve(document.querySelector("#actual-content"));
		};
	}, []);
	return (
		<div className="App">
			<section id="first-section">
				<h1>On and On 1</h1>
			</section>
			<section id="second-section">
				<div id="actual-content">
					<h1>On and On 2</h1>
				</div>
			</section>
			<section id="third-section">
				<h1>On and On 3</h1>
			</section>
		</div>
	);
}

export default App;
