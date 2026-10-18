import Image from "next/image";

export default function Loading() {
  return (
    <div className="app">
      <div className="empty-state" style={{ paddingTop: 60 }}>
        <Image
          src="/denkgang-mark.png"
          alt=""
          width={873}
          height={873}
          className="logo-img empty-state-mark loading-mark"
          style={{ width: 36, height: 36 }}
        />
        <p style={{ margin: 0 }}>Wird geladen …</p>
      </div>
    </div>
  );
}
