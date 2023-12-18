import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';
import styles from "./Button.module.scss";

type propTypes = {
    children?: ReactNode,
    text?: string,
    onClick?: () => void,
    className?: string,
    fluid?: boolean,
    disabled?: boolean,
}

const Button = (props: propTypes) => {

    const x = useMotionValue(125)
    const y = useMotionValue(35)

    const rotateX = useTransform(y, [0, 70], [20, -20])
    const rotateY = useTransform(x, [0, 250], [-20, 20])

    let springRotateX = useSpring(rotateX);
    let springRotateY = useSpring(rotateY);

    function handleMouse(event: any) {
        x.set(event.clientX - event.currentTarget.offsetLeft)
        y.set(event.clientY - event.currentTarget.offsetTop)
    }

    return (
        <>
            <div
                onMouseMove={handleMouse}
                className={styles.btn_wrapper}
                onMouseLeave={() => { x.set(125); y.set(35) }}
            >
                <motion.button
                    className={`${styles.button} ${props.fluid ? "w-100" : ""} ${props.className || ""}`}
                    onClick={props.onClick}
                    disabled={props.disabled}
                    style={{
                        rotateX: springRotateX,
                        rotateY: springRotateY,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                >
                    <span>
                        {
                            props.text || props.children
                        }
                    </span>
                </motion.button>
            </div >
        </>
    )
}

export default Button
