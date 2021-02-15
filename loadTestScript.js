import { check } from "k6";
import http from "k6/http";

export default function() {
  const payload = JSON.stringify({
    username: 'thekogo',
    password: '123456789',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.put("http://localhost:5000/users", payload, params);
  check(res, {
    "is status 200": (r) => r.status === 200
  });
}