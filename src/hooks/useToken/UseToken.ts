import {useEffect, useRef, useState} from "react";

function UseToken() {
    let token = useRef<string | null>(null);
    let username = useRef<string | null>(null);
    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
        username.current = document.cookie.split('; ').find(row => row.startsWith('username'))?.split('=')[1] || null;
    }, [token]);
  return {
      token,
      username
  }
}

export default UseToken;