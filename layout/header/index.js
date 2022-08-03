import React from "react";
import Login from "features/Login";
import { Box } from "@mui/material";
import Image from "next/image";
import textLogo from 'assets/svg/snipster-logo.svg'
import style from './header.module.scss'
import Link from "next/link";

const Header = () => {
  return (
    <Box className={style.header} bgcolor="primary.dark">
        <Link href='/'>
          <a>
            <Image src={textLogo} height={45} width={200} style={{ cursor: 'pointer' }} />
          </a>
        </Link>
        <Login />
    </Box>
  );
};

export default Header;
