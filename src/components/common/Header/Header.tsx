import { stagger, useAnimate } from "framer-motion";
import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import logoImg from "../../../assets/logo/logo-large.png";
import Button from '../Button/Button';
import styles from "./Header.module.scss";


const Header = () => {
    const [scope, animate] = useAnimate();
    const logo = useRef<HTMLHeadingElement>(null);
    const navs = useRef<HTMLLIElement[] | null>([]);
    const btn = useRef<HTMLLIElement>(null);
    const navLinks = [
        {
            to: "",
            title: "About",
            key: "about",
        },
        {
            to: "",
            title: "Contact Us",
            key: "contact-us",
        },
        {
            to: "",
            title: "Features",
            key: "features",
        },
    ]


    useEffect(() => {
        // animate(scope.current, { opacity: 0 }, { duration: 0.5 });
        const sequence: any = [
            [logo.current, { y: [-100, 0], opacity: [0, 1] }, { duration: 0.5 }],
            [navs.current, { y: [-100, 0], opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.2) }],
            [btn.current, { opacity: [0, 1], scale: [0, 1] }, { duration: 0.5 }],

        ]
        animate(sequence)
    }, [])

    return (
        <>
            <header className={styles.header}>
                <Container>
                    <div className={styles.header_in}>
                        <h2 ref={logo} className={styles.logo}>
                            <img src={logoImg} alt="logo" />
                        </h2>
                        <ul>
                            {
                                navLinks.map((item, index) => (
                                    <li ref={el => navs.current[index] = el} key={item.key}>
                                        <a
                                            href={item.to}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))
                            }
                            <li ref={btn}>
                                <Button>
                                    Social Media
                                </Button>
                            </li>
                        </ul>
                    </div>
                </Container>
            </header>
        </>
    )
}

export default Header
