import { useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';

export const Menu = () => {
    const [expanded, setExpanded] = useState(false);
    const [{ x, y }, set] = useSpring(() => ({
        x: 188,
        y: 320,
    }));
    const bind = useDrag(
        ({ movement: [x, y], velocity, down, direction: [dx], tap }) => {
            if (tap) {
                setExpanded(!expanded);
                set({ x: expanded ? 188 : 0, y: 320 });
                return;
            }
            if (!down) {
                setExpanded(x > 96 ? false : true);
                set({ x: x > 96 ? 188 : 0, y: 320 });
            } else {
                set({ x, y });
            }
        },
        {
            initial: () => [x.get(), y.get()],
            bounds: { left: 0, right: 188, top: 0, bottom: 476 },
            rubberband: false,
        }
    );

    const appStyle = {
        alignItems: "center",
        backgroundColor: "#fff",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        margin: 0,
    };

    const screenStyle = {
        height: '100%',
        left: 13,
        overflow: "hidden",
        position: "absolute" as "absolute",
        top: 12,
        width: 238,
    };


    const overlayStyle = {
        position: "absolute" as "absolute",
    };

    const menuStyle = {
        position: "absolute" as "absolute",
        width: "100%",
        x: x.to((x) => x * 1.6), // 1.2553
    };

    const menuListStyle = {
        listStyle: "none",
        padding: "50px 36px 0",
        color: "#fff",
    };

    const menuItemStyle = {
        alignItems: "center" as "center",
        borderBottom: "1px solid #fff",
        display: "flex",
        fontFamily: "'Catamaran'",
        fontSize: 24,
        height: 50,
        userSelect: "none" as 'none',
        WebkitUserSelect: "none" as "none",
    };

    const handleStyle = {
        alignItems: "center" as 'center',
        borderRadius: 25,
        cursor: "pointer" as 'pointer',
        display: "flex" as "flex",
        justifyContent: "center" as 'center',
        height: 50,
        position: "absolute" as "absolute",
        top: 0,
        width: 50,
        x,
        y,
    };

    const backStyle = {
        fill: "none",
        stroke: "#fff",
        strokeWidth: 4,
        strokeLinecap: "round" as "round",
    };

    return (
        <div style={appStyle}>
            <div style={screenStyle}>
                <animated.svg
                    style={overlayStyle}
                    viewBox="0 0 238 526"
                    height="526"
                    width="238"
                >
                    <animated.path
                        d={x.to({
                            range: [0, 188],
                            output: [
                                "M 269.60295,826 V -136 H -11 V 287 C -11,317.33323 -11.001,325 -11.001,345 -11.001,365 -11,372.66677 -11,403 V 826 Z",
                                "M 269.60295,826 V -136 H 228 V 287 C 228,317.13885 190,314.87925 190,345 190,375.12075 228,372.96796 228,403 V 826 Z",
                            ],
                        })}
                        style={{ y: y.to((y) => y - 320), fill: "#4C54A1" as 'initial' }}
                    />
                </animated.svg>
                <animated.div style={menuStyle}>
                    <ul style={menuListStyle}>
                        <li className="MenuItem" style={menuItemStyle}>
                            Withdraw
              </li>
                        <li className="MenuItem" style={menuItemStyle}>
                            Deposit
              </li>
                        <li className="MenuItem" style={menuItemStyle}>
                            Cash out
              </li>
                        <li className="MenuItem" style={menuItemStyle}>
                            Log out
              </li>
                    </ul>
                </animated.div>
                <animated.div {...bind()} style={handleStyle}>
                    <svg style={backStyle} viewBox="0 0 50 50" height="20" width="20">
                        <animated.path
                            d={x.to({
                                range: [0, 94, 188],
                                output: [
                                    "M 17.967,8 32.967,25 17.967,42",
                                    "M 25,8 25.001,25 25,42",
                                    "M 31.700243,8 16.700243,25 31.700243,42",
                                ],
                            })}
                        //d="M 31.700243,8 16.700243,25 31.700243,42"
                        />
                    </svg>
                </animated.div>
            </div>
        </div>
    );
}