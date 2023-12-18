import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import styles from "./WebsiteLoader.module.scss";

type propTypes = {
    progress?: number,
}

const WebsiteLoader = (props: propTypes) => {
    let [hide, setHide] = useState(false);
    useEffect(() => {
        if (props.progress === 100) {
            setTimeout(() => {
                setHide(true);
            }, 1000);
        }
    }, [props.progress])
    if (!hide) {
        return (
            <>
                <motion.div
                    animate={
                        props.progress === 100 ? {
                            width: 0,
                            height: 0,
                            borderRadius: "100%",
                        }
                            :
                            {}
                    }
                    transition={{
                        type: 'tween',
                        duration: 0.5,
                        delay: 0.6,
                    }}
                    className={`${styles.loader}`}>
                    <h2>{props.progress}</h2>
                </motion.div>
            </>
        )
    }
    else {
        return null;
    }
}

export default WebsiteLoader
