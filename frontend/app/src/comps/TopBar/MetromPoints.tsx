import { useMetromPoints } from "@/src/metrom";
import { useAccount } from "@/src/services/Ethereum";
import { css } from "@/styled-system/css";
import { Amount } from "../Amount/Amount";

export function MetromPoints() {
  const { address } = useAccount();
  const { points, loading } = useMetromPoints(address);

  if (!address)
    return <div>Connect wallet to see your accrued Metrom points.</div>;

  if (loading)
    return (
      <div
        className={css({
          position: "absolute",
          inset: 0,
          backgroundColor: "loadingGradient1",
          backgroundImage: `linear-gradient(
      var(--loading-angle),
      token(colors.loadingGradient1) 0%,
      token(colors.loadingGradient2) var(--loading-midpoint1),
      token(colors.loadingGradient2) var(--loading-midpoint2),
      token(colors.loadingGradient1) 100%
    )`,
          willChange: "transform background-image",
        })}
      ></div>
    );

  return (
    <div className={css({ display: "flex", gap: 6, marginBottom: -5 })}>
      <div>Points:</div>
      <Amount fallback="-" format="2z" title="Points" value={points} />
    </div>
  );
}
