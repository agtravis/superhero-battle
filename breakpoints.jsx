// import { Breakpoint } from "react-socks";

<div>
  <Breakpoint small down>
    <div>I will render only in mobile devices</div>
  </Breakpoint>

  <Breakpoint medium only>
    <div>I will render only in tablets (iPad, etc...)</div>
  </Breakpoint>

  <Breakpoint medium down>
    <div>
      I will render in tablets (iPad, etc...) and everything below (mobile
      devices)
    </div>
  </Breakpoint>

  <Breakpoint medium up>
    <div>
      I will render in tablets (iPad, etc...) and everything above (laptops,
      desktops)
    </div>
  </Breakpoint>

  <Breakpoint large up>
    <div>I will render in laptops, desktops and everything above</div>
  </Breakpoint>
</div>;
