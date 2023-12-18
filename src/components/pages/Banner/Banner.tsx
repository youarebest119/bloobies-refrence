import { animate, motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import styles from "./Banner.module.scss";
import Header from "../../common/Header/Header";

const Banner = () => {
    const banner = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: banner,
        offset: ["end start", "end end"]
    })

    const y = useTransform(scrollYProgress, [1, 0], [0, -800]);
    const textY = useTransform(scrollYProgress, [1, 0], [0, -400]);
    const variants = {
        hide: {
            y: "100px",
            opacity: 0,
        },
        open: (custom: number) => ({
            y: "0",
            opacity: 1,
            transition: {
                delay: custom * 0.08,
                duration: 0.4,
                type: "spring",
                stiffness: 140
            }
        })
    }
    const h2 = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(h2, {
        once: true,
    });

    const downBtn = useRef(null);
    useEffect(() => {
        animate(
            downBtn.current,
            {
                opacity: [0, 1],
                scale: [0, 1]
            },
            {
                duration: 0.5,
                type: "spring",
                delay: 0.6,
            }
        )
        console.dir(banner.current);
    }, [])

    return (
        <>
            <section ref={banner} className={styles.banner}>
                <Container>
                    <div className={styles.banner_in}>
                        <motion.button
                            className={styles.down_btn}
                            ref={downBtn}
                            style={{ y }}
                        >
                            Scroll Down
                            <motion.span
                                animate={{ y: 20 }}
                                transition={{ repeatType: "reverse", ease: "easeInOut", duration: 1, repeat: Infinity }}
                            >
                                <svg width="52" height='52' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="down-arrow">
                                    <g data-name="arrow-down arrow-load">
                                        <polygon pathLength={0} fill="#fbe787" points="61 35 32 61 3 35 20 35 5 3 32 3 59 3 44 35 61 35"></polygon>
                                        <path fill="#9b6cf4" d="M61.934,34.643A1,1,0,0,0,61,34H45.573L59.905,3.424A1,1,0,0,0,59,2H5A1,1,0,0,0,4.1,3.424L18.427,34H3a1,1,0,0,0-.667,1.745l29,26a1,1,0,0,0,1.334,0l29-26A1,1,0,0,0,61.934,34.643ZM32,59.657,5.613,36H20a1,1,0,0,0,.905-1.424L6.573,4H57.427L43.1,34.576A1,1,0,0,0,44,36H58.387Z"></path>
                                    </g>
                                </svg>
                            </motion.span>
                        </motion.button>
                        <h2 ref={h2} style={{ y: textY }}>
                            {
                                "There's Little More".split(" ").map((item, index) => <motion.div key={`${item}_${index}`}>
                                    {
                                        item.split("").map((letter, inddex) =>
                                            <motion.span
                                                key={`${letter}_${inddex}`}
                                                custom={inddex}
                                                variants={variants}
                                                initial={"hide"}
                                                animate={isInView ? "open" : ""}
                                            >{letter}</motion.span>
                                        )
                                    }&nbsp;
                                </motion.div>
                                )
                            }
                        </h2>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Banner
