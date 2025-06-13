// import { decrement, generalInput, increment } from "@/app/testingSlice";
// import { useDispatch, useSelector } from "react-redux";

import Directory from "./components/directory/Directory.component";
import { Outlet } from "react-router";

export default function HomePage() {
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();
  return (
    <div>
      {/* <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          onClick={() =>
            dispatch(generalInput({ value: 5, operator: "kurang" }))
          }
        >
          Kurangi 5
        </button>
      </div> */}
      <Directory />
      <Outlet />
    </div>
  );
}
