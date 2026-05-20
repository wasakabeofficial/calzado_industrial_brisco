export default function Logo() {
  return (
    <div className="flex items-center gap-3.5">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 0 H64 V50 L50 64 H6 Q0 64 0 58 V6 Q0 0 6 0 Z"
          fill="#FF6600"
        />
        <text
          x="11"
          y="50"
          fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="900"
          fontSize="52"
          fill="white"
        >
          b
        </text>
      </svg>

      <div className="flex flex-col gap-0">
        <div className="flex items-baseline gap-0.5">
          <span className="font-['Arial_Black',Helvetica_Neue,Arial,sans-serif] font-black text-[26px] text-[#FF6600] tracking-[0.01em] leading-none">
            Brisco
          </span>
          <span className="font-['Arial',sans-serif] text-[11px] text-[#FF6600] align-super leading-none">
            ®
          </span>
        </div>
        <span className="font-['Arial',sans-serif] font-normal text-[12.5px] text-[#1a1a1a] tracking-[0.18em] lowercase leading-[1.3]">
          calzado industrial
        </span>
      </div>
    </div>
  );
}
