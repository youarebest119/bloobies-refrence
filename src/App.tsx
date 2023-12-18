import { useEffect, useRef, useState } from "react";
import WebsiteLoader from "./components/common/WebsiteLoader/WebsiteLoader"
import Homepage from "./components/pages/Homepage";
import Lenis from '@studio-freight/lenis';
import LocomotiveScroll from "locomotive-scroll";
import Scrollbar from "smooth-scrollbar";
import { useMotionValueEvent, useScroll } from "framer-motion";

function App() {
	const [progress, setProgress] = useState(1);
	const [showSite, setShowSite] = useState(false);
	useEffect(() => {
		document.body.style.overflow = "hidden";
		const interval = setInterval(() => {
			setProgress(progress * 1.15);
		}, 100);
		if (progress >= 100) {
			setProgress(100);
			document.body.style.overflow = "visible";
			setTimeout(() => {
				setShowSite(true);
			}, 600);
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [progress]);

	useEffect(() => {
		const lenis = new Lenis();
		function raf(time) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}
		requestAnimationFrame(raf);
	}, [])
	// const ref = useRef();

	// const { scrollYProgress } = useScroll({
	// 	target: ref,
	// 	offset: ["end start", "end end"]
	// })

	// useMotionValueEvent(scrollYProgress, "change", update => {
	// 	console.log('update', update);
	// })
	return (
		<>
			{/* <Homepage /> */}
			{showSite && <Homepage />}
			<WebsiteLoader progress={Math.round(progress)} />


			{/* <section ref={ref} style={{ height: "100vh" }} />
			<section style={{ border: "2px solid black", height: "100vh" }}>Section 1</section>
			<section style={{ border: "2px solid black", height: "100vh" }}>Section 2</section>
			<section style={{ border: "2px solid black", height: "100vh" }}>Section 3</section>
			<section style={{ border: "2px solid black", height: "100vh" }}>Section 4</section>
			<section style={{ border: "2px solid black", height: "100vh" }}>Section 5</section> */}


		</>
	)
}

export default App
