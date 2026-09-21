import { ReactComponent as Star } from "../../assets/star.svg";
import type { FormsData } from "../../App";
import { getRqSymbol, valueToNumber } from "../../utils/utils";
import "./CardTD.css";

const fallbackFlag = "https://flagcdn.com/gb.svg";

const getRqColor = (rq: number) => {
    if (rq >= 80) return "#febc10";
    if (rq >= 65) return "#8b5bff";
    if (rq >= 50) return "#fd3639";
    if (rq >= 40) return "#fff62b";
    if (rq >= 30) return "#19c8ff";
    if (rq >= 20) return "#77f273";
    return "#828282";
};

const renderStars = (points: number, color: string) => {
    const filled = Math.min(3, Math.max(0, Math.round((points || 0) / 2)));
    return Array.from({ length: 3 }).map((_, index) => {
        const starColor = index < filled ? color : "rgba(255, 255, 255, 0.18)";
        return (
            <Star
                key={`${color}-${index}`}
                className={index < filled ? "td-star td-star--filled" : "td-star"}
                style={{ color: starColor }}
            />
        );
    });
};

const TD_WRENCH_PATH = "M 9.500 1.569 C 6.162 3.302, 1 7.928, 1 9.187 C 1 9.634, 5.692 10, 11.428 10 L 21.855 10 25.500 16 L 29.145 22 25.500 28 L 21.855 34 11.428 34 C 5.692 34, 1 34.366, 1 34.813 C 1 36.341, 6.495 40.892, 10.218 42.447 C 18.671 45.978, 28.064 43.752, 34.946 36.588 L 38.392 33 86.255 33 L 134.117 33 138.165 36.250 C 141.769 39.144, 142.895 39.498, 148.456 39.483 C 153.734 39.469, 155.266 39.035, 158.359 36.675 C 165.953 30.883, 168.239 20.507, 163.555 13.088 C 157.394 3.328, 145.585 1.036, 137.597 8.049 L 134.236 11 86.321 11 L 38.406 11 34.532 7.033 C 32.401 4.851, 29.205 2.376, 27.428 1.533 C 23.237 -0.456, 13.364 -0.436, 9.500 1.569 M 142.948 12.348 L 137.500 15.615 137.203 21.777 L 136.906 27.938 141.703 30.950 C 144.341 32.607, 147.109 33.971, 147.853 33.981 C 148.597 33.991, 151.409 32.763, 154.102 31.250 L 158.998 28.500 158.999 21.991 C 159 16.856, 158.630 15.260, 157.250 14.433 C 156.287 13.856, 153.902 12.416, 151.948 11.233 L 148.396 9.082 142.948 12.348 M 43 22 L 43 25 85.500 25 L 128 25 128 22 L 128 19 85.500 19 L 43 19 43 22";
const TD_ABS_TCS_PATH = "m 36.1192,42.986695 c 2.7575,-0.0734 5.0896,-0.957528 6.3085,-2.391657 1.1578,-1.362318 1.3753,-3.317926 0.5177,-4.654646 -0.645,-1.005325 -1.4626,-1.550594 -3.9972,-2.665974 -1.7722,-0.779903 -2.288,-1.08677 -2.7626,-1.643757 -0.8025,-0.941844 -0.4417,-2.37275 0.7896,-3.130571 1.4573,-0.897016 4.4513,-0.983117 7.2822,-0.209427 0.1758,0.04804 0.1966,0.04953 0.1966,0.01414 0,-0.01087 0.098,-0.463241 0.2186,-1.005271 0.2568,-1.157494 0.5619,-0.953995 0.219,-1.024265 -3.8031,-0.77914 -7.1902,-0.549672 -9.3577,0.771349 -2.5935,1.580758 -3.1377,4.549119 -1.1626,6.342002 0.6935,0.62958 1.346,0.991157 3.4816,1.929332 2.4325,1.068656 3.1304,1.770769 2.9897,3.007858 -0.2264,1.990779 -2.3996,2.884702 -6.3628,2.617305 -1.2307,-0.08303 -2.5079,-0.323651 -3.4416,-0.648329 -0.1174,-0.04084 -0.2154,-0.0724 -0.2179,-0.07013 0,0.0044 -0.4535,2.173692 -0.4535,2.191964 0,0.01347 0.4725,0.123499 0.8052,0.187509 1.0332,0.198785 2.6187,0.360313 3.8228,0.389473 0.4034,0.0098 0.5262,0.009 1.1244,-0.0069 z m -13.2155,-0.01985 c 1.4119,-0.08257 2.8827,-0.286333 4.1933,-0.824165 0,-0.0034 0.4553,-2.131548 0.4553,-2.145319 -2.1422,0.718027 -4.2902,1.265003 -6.5492,0.657828 -2.0508,-0.685846 -2.7904,-2.786117 -2.1321,-6.054458 0.8178,-4.059936 3.3786,-6.621847 6.7483,-6.751172 2.8691,-0.110115 4.2801,1.075446 4.3327,1.007519 0,-0.0034 0.051,-0.225892 0.4827,-2.232812 l -0.1174,-0.0525 c -1.712,-0.76574 -4.5479,-0.9813 -6.5951,-0.501294 -4.0124,0.9408 -6.9981,4.628858 -7.6306,9.425643 -0.6408,4.859151 1.4874,7.388235 6.2959,7.481837 0.052,10e-4 0.2842,-0.004 0.5162,-0.01111 z M 9.9218,27.987888 c 1.7764,-0.03394 3.5561,-0.02165 5.3336,-0.02396 0.1448,-0.638207 0.2738,-1.279664 0.4219,-1.917223 l 0.01,-0.03076 H 2.5431 c -0.041,0.165297 -0.4212,1.921835 -0.4212,1.935526 0,0.04596 5.3359,-0.01092 5.3187,0.04321 -0.012,0.0382 -3.1716,14.746299 -3.1716,14.764386 0.8217,0.03358 1.6504,0.01634 2.4741,0.01634 1.0732,-4.926636 2.0994,-9.862413 3.1806,-14.787522 z m 28.156,-10.789143 c 4.7295,-0.145238 7.6297,-2.245415 7.491,-5.424655 -0.08,-1.8258588 -1.1092,-2.8047668 -4.5242,-4.3013218 -1.7605,-0.771509 -2.3515,-1.131571 -2.8053,-1.708973 -0.6773,-0.861813 -0.3802,-2.190062 0.6555,-2.930575 1.4091,-1.007509 4.4155,-1.14973 7.4229,-0.351146 0.2333,0.06195 0.2536,0.06279 0.2542,0.01053 3e-4,-0.02767 0.4403,-1.98497297 0.4297,-1.99491497 -0.055,-0.05166 -1.5106,-0.29283 -2.33,-0.385993 -3.3105,-0.376398 -6.0021,0.202997 -7.7587,1.67012797 -1.8127,1.513966 -2.146,3.917965 -0.7597,5.478839 0.6657,0.749528 1.4778,1.240096 3.5712,2.157342 1.3966,0.6119248 1.7241,0.7808478 2.2197,1.1449168 0.8953,0.657633 1.1749,1.315218 0.9632,2.265194 -0.4088,1.834098 -2.7492,2.637635 -6.6793,2.29318 -1.094,-0.09589 -2.3743,-0.36096 -3.2019,-0.662963 -0.082,-0.02985 -0.091,-0.03074 -0.097,-0.0098 -0.013,0.0403 -0.4439,2.145355 -0.4439,2.166624 0,0.0518 1.0736,0.260385 1.8718,0.363661 1.0922,0.141317 1.9685,0.204913 3.1842,0.231086 0.056,0.0012 0.2974,-0.0038 0.5368,-0.01118 z M 4.6796,13.330158 h 7.5071 c 0.034,0.226226 0.437,3.60788 0.437,3.625899 0.8396,0.06181 1.7587,0.024 2.6139,0.024 l -0.01,-0.05126 C 15.2056,16.80132 12.9571,0.26748523 12.9478,0.23768623 c -1.1166,-0.03368 -2.2387,-0.01709 -3.3569,-0.01709 l -0.021,0.03076 C 9.5589,0.26827623 7.4164,4.0099322 4.8096,8.5661542 2.2028,13.122376 0.0543,16.875896 0.035,16.907308 0.016,16.938718 0,16.967978 0,16.972318 c 0.8723,0.01012 1.7449,0.0032 2.6173,9.13e-4 z M 10.7981,2.3648622 c 0.01,0.02141 1.0797,8.7616298 1.1035,8.9147908 H 5.8173 C 7.8792,7.5552572 10.7904,2.3469232 10.7981,2.3648622 Z M 23.0186,16.966188 c 4.4868,-0.176643 7.3265,-2.294848 7.4861,-5.584009 0.115,-2.3686258 -2.0089,-3.0274818 -2.8701,-3.1968758 l 0.2091,-0.06386 c 2.0033,-0.611757 3.2647,-1.942934 3.5812,-3.779333 0.4534,-2.630447 -1.1601,-4.00123397 -4.8352,-4.10783997 -0.4366,-0.01267 -5.4499,-0.01978 -5.4499,-0.0077 0,0.01703 -3.5797,16.60527077 -3.5941,16.70225477 l -0.01,0.05126 c 1.8247,-0.02106 3.6567,0.03247 5.4806,-0.01389 z m -2.6014,-1.93643 c 0,-0.01376 0.2836,-1.312797 0.6217,-2.886746 l 0.6149,-2.8617248 c 1.0918,0.03269 2.2049,-0.03314 3.2943,0.02836 2.1825,0.188612 3.1575,1.0757508 2.9014,2.6398378 -0.293,1.789574 -1.7331,2.850024 -4.1708,3.071199 -0.3978,0.03609 -3.271,0.04409 -3.2615,0.0091 z m 1.6414,-7.6760548 c 0.376,-1.732514 0.7482,-3.465768 1.1216,-5.198797 0.9975,0.01055 1.9967,-0.03036 2.9938,0.007 2.2875,0.10798 3.1253,1.017497 2.5689,2.788536 -0.3772,1.200347 -1.5601,2.096713 -3.0927,2.343508 -1.181,0.14031 -2.4063,0.08717 -3.6,0.09129 z";
const TD_TRAP_PATH = "M 343.24769,794.5172 C 331.81136,747.18987 320.61573,699.80544 309.22243,652.4679 l -0.13883,-0.55779 H 0 v -10.90976 c 0,0 314.54765,0.14436 315.50187,0.57157 1.24862,0.55903 2.0484,1.29279 2.62161,2.40524 0.60441,1.17298 36.16406,150.15163 36.33933,150.66398 0.12522,0.36603 -10.9835,0.62804 -11.21512,-0.12394 z m 579.42109,0.3226 c 0,-0.45298 35.79447,-149.47993 36.09764,-150.28909 0.40594,-1.08353 1.90219,-2.61335 3.05704,-3.12564 C 1067.8765,640.85836 1173.9425,641.04217 1280,641 v 10.9097 l -311.97066,0.12435 -2.19504,9.17248 c -52.06354,217.55657 18.05619,-75.5536 -29.98405,125.25376 l -2.03128,8.49073 h -5.5751 c -3.06628,0 -5.57509,-0.05 -5.57509,-0.11122 z";

const getFlagAsset = (countryCode: string) => {
    const code = (countryCode || "GB").toUpperCase();
    const normalized = code === "UK" ? "GB" : code;
    return `https://flagcdn.com/${normalized.toLowerCase()}.svg`;
};

const renderAbsTcs = (absOn: boolean, tcOn: boolean) => (
    <div className="td-badges" aria-label="ABS and TCS status">
        <svg className="td-badge-svg" viewBox="0 0 47 21" width="47" height="21" aria-label="ABS" style={{ display: "block" }}>
            <path d={TD_ABS_TCS_PATH} fill={absOn ? "#97FABA" : "#CD0A0A"} />
        </svg>
        <svg className="td-badge-svg" viewBox="0 22 47 21" width="47" height="21" aria-label="TCS" style={{ display: "block" }}>
            <path d={TD_ABS_TCS_PATH} fill={tcOn ? "#97FABA" : "#CD0A0A"} />
        </svg>
    </div>
);

const CardTD = ({ formData }: { formData: FormsData }) => {
    const topSpeed = valueToNumber(formData.topSpeed);
    const zeroToSixty: string | number = valueToNumber(formData.zeroToSixty);
    const handling = valueToNumber(formData.handling);
    const rq = valueToNumber(formData.rq);
    const symbol = getRqSymbol(rq);
    const color = getRqColor(rq);
    const year = valueToNumber(formData.year);
    const manufacturer = formData.manufacturer || "";
    const model = formData.model || "";
    const country = formData.country || "GB";
    const drivetrain = formData.drivetrain || "RWD";
    const driveFirst = drivetrain.charAt(0);
    const driveRest = drivetrain.slice(1);
    const tyreLabel = (formData.tyres || "Performance").toUpperCase();
    const absEnabled = formData.abs ?? true;
    const tcEnabled = formData.tc ?? true;
    const clearanceLevel = formData.clearance ?? 2;
    const clearanceMap: Record<number, string> = {
        1: "LOW",
        2: "MID",
        3: "HIGH",
    };
    const weight = valueToNumber(formData.weight);
    const tuningMotor = valueToNumber(formData.engineTuning);
    const tuningWeight = valueToNumber(formData.weightTuning);
    const tuningChassis = valueToNumber(formData.chassisTuning);
    const zeroText = zeroToSixty === 0 ? "N/A" : Number(zeroToSixty).toFixed(1);
    const bgImage = formData.image ? `url(${formData.image})` : "linear-gradient(135deg, #ffffff, #ffffff)";

    return (
        <div
            className="td-card"
            style={{
                backgroundImage: bgImage,
                backgroundSize: `${formData.bgSize || 100}%`,
                backgroundPosition: `${formData.bgX || 50}% ${formData.bgY || 50}%`,
                backgroundRepeat: "no-repeat",
                backgroundColor: formData.image ? "#101112" : "#ffffff",
                ["--rq-color" as any]: color,
            }}
        >
            <div className="td-photo-overlay" />

            <div className="td-header">
                <div className="td-header__bg" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.72), rgba(60,60,60,0.65))" }} />
                <div className="td-flag" aria-label={country}>
                    <img
                        src={getFlagAsset(country)}
                        alt={country}
                        onError={(event) => {
                            const target = event.currentTarget as HTMLImageElement;
                            if (target.src !== fallbackFlag) {
                                target.src = fallbackFlag;
                            }
                        }}
                    />
                </div>
                <div className="td-logo">
                    {formData.logo ? <img src={formData.logo} alt="Manufacturer logo" /> : null}
                </div>
                <div className="td-info">
                    <div className="td-name">
                        <b>{manufacturer}</b>
                        <span> {model}</span>
                    </div>
                </div>
                <div className="td-year">
                    <span>{year}</span>
                </div>
                <div className="td-badge" style={{ background: color }}>
                    <span className="td-badge__symbol" style={{ color: "#23154A" }}>{symbol}</span>
                    <span className="td-badge__value">{rq}</span>
                </div>

                <div className="td-tuning" style={{ background: "rgba(0,0,0,0.55)" }}>
                    <div className="td-tune">
                        <span>ENGINE</span>
                        <div className="td-tune__stars">{renderStars(tuningMotor, color)}</div>
                    </div>
                    <div className="td-tune">
                        <span>WEIGHT</span>
                        <div className="td-tune__stars">{renderStars(tuningWeight, color)}</div>
                    </div>
                    <div className="td-tune">
                        <span>CHASSIS</span>
                        <div className="td-tune__stars">{renderStars(tuningChassis, color)}</div>
                    </div>
                </div>
            </div>

            <div className="td-footer">
                <div className="td-zones">
                    <div className="td-zone td-zone--left" aria-hidden="true">
                        <div className="td-zone__bg" style={{ backgroundImage: bgImage, backgroundPosition: `${formData.bgX || 50}% ${formData.bgY || 50}%`, backgroundSize: `${formData.bgSize || 100}%` }} />
                    </div>
                    <div className="td-zone td-zone--center" aria-hidden="true">
                        <div className="td-zone__bg" style={{ backgroundImage: bgImage, backgroundPosition: `${formData.bgX || 50}% ${formData.bgY || 50}%`, backgroundSize: `${formData.bgSize || 100}%` }} />
                    </div>
                    <div className="td-zone td-zone--right" aria-hidden="true">
                        <div className="td-zone__bg" style={{ backgroundImage: bgImage, backgroundPosition: `${formData.bgX || 50}% ${formData.bgY || 50}%`, backgroundSize: `${formData.bgSize || 100}%` }} />
                    </div>
                </div>

                <svg className="td-trap" viewBox="0 641 1280 154" preserveAspectRatio="none" aria-hidden="true">
                    <path d={TD_TRAP_PATH} fill={color} />
                </svg>

                <div className="td-footer__left">
                    <div className="td-row">
                        <span className="td-label">CLEARANCE:</span>
                        <span className="td-value">{clearanceMap[clearanceLevel] || "MID"}</span>
                    </div>
                    {weight > 0 && (
                        <div className="td-row">
                            <span className="td-label">WEIGHT:</span>
                            <span className="td-value">{weight} KG</span>
                        </div>
                    )}
                </div>

                <div className="td-footer__stats">
                    <div className="td-stat">
                        <div className="td-stat__value">{topSpeed}</div>
                        <div className="td-stat__label">TOP SPEED</div>
                    </div>
                    <div className="td-stat">
                        <div className="td-stat__value">{zeroText}</div>
                        <div className="td-stat__label">0-60 MPH</div>
                    </div>
                    <div className="td-stat">
                        <div className="td-stat__value">{handling}</div>
                        <div className="td-stat__label">HANDLING</div>
                    </div>
                </div>

                <div className="td-footer__right">
                    <div className="td-right-main">
                        <div className="td-drive">
                            <b>{driveFirst}</b>
                            <span>{driveRest}</span>
                        </div>
                        <svg className="td-wrench" width="13" height="44" viewBox="0 0 44 166" aria-hidden="true">
                            <g transform="translate(44,0) rotate(90)">
                                <path d={TD_WRENCH_PATH} fill="#fffcfc" fillRule="evenodd" />
                            </g>
                        </svg>
                        {renderAbsTcs(absEnabled, tcEnabled)}
                    </div>
                    <div className="td-tire">
                        <b>{tyreLabel.split(" ")[0]}</b>
                        {tyreLabel.includes(" ") ? ` ${tyreLabel.split(" ").slice(1).join(" ")}` : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardTD;
