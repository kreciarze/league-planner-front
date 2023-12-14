import {useEffect, useRef, useState} from "react";

function UseToken() {
    let token = useRef<string | null>(null);
    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
    }, [token]);
  return token;
}

export default UseToken;