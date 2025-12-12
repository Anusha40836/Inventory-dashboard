// components/Layout.tsx
import React, { PropsWithChildren } from "react";


export default function Layout({ children }: PropsWithChildren) {
return (
<div style={{ padding: 20, fontFamily: "Inter, sans-serif" }}>
<header style={{ marginBottom: 12 }}>
<h1>Inventory Dashboard POC</h1>
</header>
<main>{children}</main>
</div>
);
}