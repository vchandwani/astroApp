import { AQUARIUS, ARIES, CANCER, CAPRICORN, GEMINI, LEO, LIBRA, PISCES, SAGITTARIUS, SCORPIO, TAURUS, VIRGO } from "@/constants/Values";
import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

interface SunSignSymbolProps extends SvgProps {
    name: string;
    isDarkTheme: boolean; 
  }

export default function  SunSignSymbol (props: SunSignSymbolProps)  {
    const fillColor = props?.isDarkTheme ? '#eee' : '#000'; // Default fill color based on theme
    const name = props?.name; // Default fill color based on theme

    switch (name) {
        case ARIES:
            return (<Svg
            xmlns="http://www.w3.org/2000/svg"
            width={props?.width ? props?.width: 800}
            height={props?.height? props?.height: 800}
            fill={fillColor}
            viewBox="0 0 960 960"
            {...props}
        >
            <G clipPath="url(#a)">
            <Path
                fill={fillColor}
                d="M468.006 458.921c29.751-119.91 63.029-247.008 155.268-334.79 103.433-99.157 254.908-18.24 268.059 114.178 10.219 72.26-9.29 146.525-65.618 196.474-3.036 2.966-8.355 4.068-12.842 4.987-38.348 11.071-64.674-33.78-41.881-63.869 47.359-46.102 55.279-125.314 17.899-180.534-23.03-36.316-64.304-42.654-98.984-17.921-72.034 55.627-100.519 151.467-125.535 235.473-30.455 117.057-43.36 237.915-55.632 357.989-3.939 29.591 8.613 71.282-11.113 95.091-18.756 24.011-64.235 15.917-69.177-14.936-2.871-16.12-1.956-32.915-2.684-49.415-1.85-47.764-5.192-95.472-8.662-143.139-10.522-128.61-41.707-254.511-82.691-376.543-19.671-61.172-82.168-142.328-149.628-87.088-63.518 41.525-36.572 136.562 10.608 185.104 20.926 20.22 57.983 33.291 43.277 69.545-52.573 82.807-165.08-88.517-167.362-142.805C33.682 167.109 207.072 31.417 325.827 129.503c98.675 80.099 107.823 215.161 142.179 329.418Z"
            />
            </G>
            <Defs>
            <ClipPath id="a">
                <Path fill={fillColor} d="M66 80h828v800.002H66z" />
            </ClipPath>
            </Defs>
        </Svg>)
        case AQUARIUS:
            return (<Svg
                height={props?.height? props?.height: 800}
                width={props?.width ? props?.width: 800}
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 51.266 51.266"
                xmlSpace="preserve"     
                fill={fillColor}
                {...props}
            >
                <G>
                <Path d="M6.116,20.427c3.599-3.93,3.536-3.987,7.901-0.923c0.503,0.353,1.016,0.692,1.516,1.05                         c7.268,5.215,7.35,5.259,11.416-2.381c1.259-2.365,2.131-1.889,3.462-0.248c1.548,1.908,3.151,3.776,4.803,5.595                         c1.613,1.777,3.703,2.122,5.498,0.645c3.474-2.858,6.767-5.946,9.992-9.087c0.553-0.538,0.394-1.808,0.563-2.74                         c-1.112-0.136-2.502-0.758-3.283-0.313c-2.112,1.205-4.14,2.682-5.887,4.376c-4.995,4.844-4.238,3.368-7.74-0.561                         c-0.136-0.152-0.261-0.316-0.388-0.477c-6.476-8.19-6.568-8.237-11.257,0.966c-1.161,2.279-1.977,1.846-3.555,0.655                         c-2.286-1.725-4.68-3.322-7.129-4.807c-2.214-1.343-4.41-1.076-6.014,1.04c-2.1,2.772-4.08,5.641-5.953,8.57                         c-0.262,0.41,0.381,1.399,0.868,2.965C3.105,22.963,4.797,21.867,6.116,20.427z" />
                <Path d="M47.868,28.958c-2.521,2.073-4.94,4.299-7.19,6.667c-1.472,1.549-2.832,1.643-4.159,0.206                         c-1.655-1.791-3.13-3.753-4.615-5.693c-2.594-3.388-3.995-3.368-6.353,0.251c-0.667,1.024-1.142,2.172-1.735,3.246                         c-1.701,3.079-2.151,3.199-4.899,0.773c-1.684-1.486-3.07-3.313-4.773-4.774c-2.208-1.894-4.028-1.826-5.803,0.419                         c-2.281,2.887-4.305,5.984-6.313,9.073c-0.348,0.535-0.285,2.038-0.048,2.127c0.815,0.306,1.918,0.476,2.671,0.148                         c0.877-0.382,1.574-1.284,2.222-2.065c1.559-1.88,3.043-3.821,4.559-5.738c2.003,1.628,3.97,3.304,6.021,4.868                         c1.6,1.22,3.306,2.301,5.016,3.48c1.16-0.727,2.182-1.099,2.796-1.819c0.777-0.911,1.242-2.094,1.806-3.178                         c1.567-3.009,1.452-2.905,3.714-0.665c1.865,1.848,3.836,3.765,6.125,4.942c1.354,0.696,4.028,0.713,5.047-0.178                         c3.21-2.809,5.983-6.135,8.753-9.407c0.441-0.521,0.346-2.217-0.127-2.605C50.003,28.564,48.43,28.496,47.868,28.958z" />
                </G>
            </Svg>)
         case CANCER:
            return (
                <Svg
                    fill={fillColor}
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={props?.width ? props?.width: 800}
                    height={props?.height? props?.height: 800}
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    {...props}
                >
                    <G>
                    <G>
                        <Path d="M27.955,19.752c-0.087,0.078-7.049,6.217-14.847,6.047c0.944-1.231,1.53-2.756,1.53-4.428                         c0-4.035-3.283-7.317-7.319-7.317C3.283,14.053,0,17.336,0,21.372c0,3.6,2.614,6.582,6.04,7.189c2.52,1.15,5.032,1.632,7.44,1.632                         c9.279,0,16.985-6.836,17.392-7.204c0.894-0.807,0.962-2.181,0.16-3.072C30.225,19.02,28.85,18.95,27.955,19.752z M7.319,24.334                         c-1.634,0-2.962-1.326-2.962-2.963c0-1.633,1.328-2.961,2.962-2.961c1.634,0,2.962,1.328,2.962,2.961                         C10.281,23.007,8.953,24.334,7.319,24.334z" />
                        <Path d="M4.045,12.247c0.087-0.077,7.049-6.215,14.848-6.045c-0.943,1.231-1.531,2.755-1.531,4.426                         c0,4.036,3.283,7.318,7.32,7.318c4.035,0,7.318-3.282,7.318-7.318c0-3.598-2.615-6.58-6.04-7.188                         c-2.521-1.153-5.032-1.633-7.44-1.633c-9.279,0-16.985,6.836-17.392,7.204c-0.895,0.807-0.962,2.181-0.16,3.071                         C1.776,12.981,3.151,13.051,4.045,12.247z M24.682,7.666c1.633,0,2.961,1.327,2.961,2.962c0,1.635-1.328,2.962-2.961,2.962                         c-1.635,0-2.963-1.327-2.963-2.962C21.719,8.994,23.047,7.666,24.682,7.666z" />
                    </G>
                    </G>
                </Svg>
            );
        case CAPRICORN:
            return (
                <Svg
                    fill={fillColor}
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={props?.width ? props?.width: 800}
                    height={props?.height? props?.height: 800}
                    viewBox="0 0 30.354 30.354"
                    xmlSpace="preserve"
                    {...props}
                >
                    <G>
                    <Path d="M18.829,28.559c1.036-0.002,1.396,1.449,0.948,1.449c-0.446,0-1.979,0.004-2.239,0.004s-0.22-0.537-0.178-1.043                  c0.042-0.504-0.736-5.443-0.896-5.932c-0.158-0.488-1.062,0.025-4.854,0.053c-3.794,0.023-4.612-1.057-4.636-0.25                  c-0.025,0.808-0.47,1.795-0.281,2.334c0.188,0.537,0.514,3.019,0.795,3.459c0.743-0.078,1.225,1.271,0.744,1.271                  c-0.482,0-1.674,0.021-1.914,0.021c-0.241,0-0.121-0.623-0.102-0.979c0.021-0.355-0.717-2.32-1.084-2.861                  c-0.365-0.539-0.481-3.328-0.481-3.328s-2.383,2.455-2.449,2.846c-0.065,0.391-0.009,3.249-0.009,3.551                  c0.782,0.08,1.131,1.168,0.75,1.168c-0.381,0-1.688,0.031-1.979,0.031c-0.294,0-0.188-1.096-0.108-1.312                  c0.078-0.219-0.418-2.582-0.418-3.567c0-0.987,1.838-3.748,1.838-4.529c0-0.78-0.626-2.368-0.531-4                  c0.144-2.442,1.648-3.681,4.039-3.701c4.488-0.04,4.326,1.723,8.696,1.042c5.21-0.812,8.815-1.724,7.963-4.135                  c0,0-0.462-0.955-0.354-1.456c0.108-0.5,0.354-0.759,0.354-0.759s-6.435-5.003-10.544-5.933c0.5-1.286,6.541,1.394,6.541,1.394                  S17.083,1.431,12.83,0.18c4.539-1.537,10.687,7.292,10.687,7.292s3.697,1.362,6.381,6.438c0.143,1.395-0.587,1.697-1.312,1.508                  c-0.724-0.189-1.291-0.812-2.176-0.644c-0.785,0.147-3.99,4.343-3.941,5.101c0.05,0.756,0.951,4.11,1.097,4.588                  c0.183,0.602-0.289,1.957-0.278,2.268c0.01,0.311,0.269,0.346,0.44,0.885c0.17,0.537,0.118,1.483-0.604,1.645                  c-0.55-0.551-1.099-1.098-1.328-1.327c-0.229-0.229,0.316-0.61,0.348-0.759c0.029-0.148,0.17-1.836-0.189-2.52                  c-0.363-0.683-2.047-2.938-2.047-2.938s-1.5,2.136-1.438,3.291C18.558,25.789,18.731,28.322,18.829,28.559z" />
                    </G>
                </Svg>
            )
        case GEMINI:
            return( <Svg
                fill={fillColor}
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={props?.width ? props?.width: 800}
                height={props?.height? props?.height: 800}
                viewBox="0 0 32 32.001"
                xmlSpace="preserve"
                {...props}
            >
                <G>
                <Path d="M21.653,23.901V8.266c2.225-0.496,3.968-1.356,5.188-2.591c1.69-1.711,1.757-3.476,1.753-3.812                      c-0.013-1.007-0.814-1.777-1.821-1.813c-1.017-0.028-1.862,0.778-1.941,1.781c-0.085,1.099-1.918,3.171-8.234,3.171                      c-6.448,0-8.56-2.188-8.778-3.354c-0.13-1.003-1.024-1.754-2.046-1.635c-1.035,0.097-1.795,1.014-1.698,2.05                      c0.021,0.209,0.482,4.043,6.009,5.814v16.055c-6.151,1.666-6.646,5.791-6.667,6.01c-0.095,1.004,0.625,1.863,1.625,1.998                      c0.997,0.135,1.936-0.58,2.114-1.572c0.208-1.165,2.313-3.365,8.78-3.365c6.316,0,8.149,2.073,8.234,3.097                      c-0.013,1.038,0.82,1.892,1.859,1.902c0.007,0,0.016,0,0.021,0c1.028,0,1.87-0.829,1.882-1.859                      c0.003-0.336-0.062-2.102-1.753-3.812C25.086,25.221,23.562,24.415,21.653,23.901z M13.847,23.311V8.619                      c0.849,0.087,1.744,0.147,2.747,0.147c0.446,0,0.87-0.02,1.294-0.037v14.577c-0.626-0.043-1.272-0.07-1.952-0.07                      C15.197,23.235,14.501,23.262,13.847,23.311z" />
                </G>
            </Svg>)
        case LEO:
            return (
                <Svg
                    fill={fillColor}
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={props?.width ? props?.width: 800}
                    height={props?.height? props?.height: 800}
                    viewBox="0 0 32.001 32.001"
                    xmlSpace="preserve"
                    {...props}
                >
                    <G>
                    <Path d="M19.385,3.031c0.377-0.188,1.1-2.749-3.46-3.021C11.364-0.26,4.957,4.808,5.069,9.093c0.978-0.76,1.89-0.148,1.939,0.378 c0.051,0.527-5.084,6.055-0.781,9.464c0.796-4.885,2.134-3.763,2.315-3.111c0.181,0.651-1.751,7.578,2.013,7.761 c-0.507-2.315,0.992-3.455,2.077-3.455c1.086,0,4.671,2.388,3.113,11.87c4.198-2.896,3.098-9.646,3.098-9.646 s0.991,1.287,2.4,0.347c-1.445-1.99-1.119-2.569-1.119-2.569s1.881,1.882,3.221,0.978c-2.244-1.736-2.063-3.364-2.117-4.857 c-0.055-1.494,1.356,0.107,2.551,0.271c4.197,0.427,3.173-2.812,2.985-2.813c-1.088-0.014-3.411,0.986-3.854-0.506 c-0.67-2.246,2.474-1.833,3.862-1.089c0.053,0.028,0.828-1.098,0.709-1.715C27.347,9.69,26.638,8.55,24.105,9.22 c-1.393,0.368-2.64-0.54-2.679-0.579c-0.217-0.217,3.126-0.865,3.139-1.12S25.638,0.752,19.385,3.031z" />
                    </G>
                </Svg>
            );
        case LIBRA:
            return (
                <Svg
                    fill={fillColor}
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={props?.width ? props?.width: 800}
                    height={props?.height? props?.height: 800}
                    viewBox="0 0 31.998 31.998"
                    xmlSpace="preserve"
                    {...props}
                >
                    <G>
                    <Path d="M29.512,13.723h1.656V11.63c0.361-0.41,0.588-0.943,0.588-1.533c0-1.288-1.045-2.331-2.332-2.331s-2.331,1.043-2.331,2.331          c0,0.063,0.015,0.12,0.019,0.183h-7.795V6.292h-0.027c0.008-0.093,0.027-0.182,0.027-0.277c-0.002-1.821-1.477-3.297-3.299-3.297          c-0.006,0-0.012,0.002-0.018,0.002s-0.012-0.002-0.018-0.002c-1.82,0-3.297,1.477-3.297,3.297c0,0.097,0.02,0.186,0.027,0.277          h-0.027v3.986H4.89c0.005-0.062,0.019-0.119,0.019-0.183c0-1.288-1.044-2.331-2.332-2.331c-1.287,0-2.33,1.043-2.33,2.331          c0,0.59,0.227,1.123,0.588,1.533v2.093H2.49c-0.98,2.201-2.762,6.808-2.455,10.585c0.42,5.167,5.671,5.167,8.023,4.872          c2.352-0.294,5.936-3.149,5.125-7.267c-0.553-2.803-3.682-6.266-5.623-8.19h5.125h6.629h5.125c-1.941,1.927-5.069,5.39-5.621,8.19          c-0.812,4.115,2.771,6.973,5.123,7.267c2.354,0.295,7.604,0.295,8.021-4.872C32.271,20.528,30.49,15.924,29.512,13.723z           M10.998,21.87c0.043,2.186-6.553,4.201-8.021,2.646c-1.309-1.382,0.756-9.102,1.229-10.795h1.82          C7.375,15.421,10.965,20.099,10.998,21.87z M29.025,24.518c-1.471,1.556-8.064-0.462-8.023-2.646          c0.035-1.772,3.624-6.45,4.975-8.148h1.818C28.27,15.416,30.332,23.136,29.025,24.518z" />
                    </G>
                </Svg>
            );
        case PISCES:
            return (
                <Svg
                    fill={fillColor}
                    width={props?.width ? props?.width: 800}
                    height={props?.height? props?.height: 800}
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    {...props}
                >
                    <Path d="M17.535 13.806c0.431-4.96 2.499-9.276 5.487-12.014h5.475c-2.987 2.738-4.708 7.053-5.059 12.014h4.41v4.958h-4.309c0.523 4.567 2.253 8.503 5.085 11.034h-5.475c-2.832-2.531-4.861-6.468-5.491-11.034h-3.612c-0.63 4.567-2.659 8.503-5.491 11.034h-5.475c2.832-2.531 4.561-6.468 5.085-11.034h-4.667v-4.958h4.768c-0.352-4.96-2.072-9.276-5.059-12.014h5.476c2.987 2.738 5.056 7.053 5.486 12.014h3.366z" />
                </Svg>
            );
            case SAGITTARIUS:
                return (
                    <Svg
                        fill={fillColor}
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width={props?.width ? props?.width: 800}
                        height={props?.height? props?.height: 800}
                        viewBox="0 0 32 32"
                        xmlSpace="preserve"
                        {...props}
                    >
                        <G>
                        <Path d="M27.425,5.235l0.242,0.551l-2.558,1.118c-0.229-0.932,0.61-1.225-0.244-3.001c-0.94-1.96-4.292-0.58-5.604-3.903                         c-0.006,0.033-0.01,0.06-0.016,0.091l-0.02-0.075l-1.149,4.271l-0.729,0.147l-0.043-0.666l-0.585,0.699l-0.442-0.653l-0.367,0.839                         l-0.787-0.666l0.259,0.919l-0.992-0.047l0.56,0.547c0,0-0.956,0.268-1.004,0.28c-0.048,0.014,0.621,0.453,0.621,0.453L13.92,6.672                         L14.55,6.9l-0.785,0.623l0.905,0.202l-0.471,0.693l0.673,0.022l0.01,0.97l0.857-0.513c0.312,0.261,0.618,0.408,0.574,0.535                         c-0.025,0.074,0.379,0.809-0.224,0.813c-0.602,0.004-0.819-0.074-0.963,0.306l-0.006,0.002l0.004,0.002                         c-0.008,0.024-0.022,0.037-0.029,0.063c-0.157,0.728,1.258,4.675,0.902,5.201c-0.17,0.25-0.889,0.077-3.129,0.046                         c-2.24-0.032-3.731,0.578-4.146,0.071c0,0-0.498-1.505-2.616-0.924c-2.119,0.581,0.021,5.83-4.078,4.94                         c4.643,5.106,4.993-3.152,6.297-2.101c1.305,1.053,0.493,2.055,0.089,2.368c-0.404,0.312-0.946,0.712-1.359,1.147                         c-0.412,0.438-0.253,3.822-0.483,4.297s-0.794,0.662-0.794,0.662s0.126,0.492,0.258,1.417c1.173,0.671,1.377-0.509,1.408-0.882                         c0.029-0.373,0.363-4.283,0.751-4.721c0.387-0.436,1.62-0.438,1.62-0.438s0.522,1.479,0.365,2.095                         c-0.159,0.618-1.51,3.14-0.979,3.976c0.532,0.836,0.399,3.623,0.59,3.623c0.191,0,1.021,0.028,1.787,0.028                         c0.307-0.729-0.662-1.253-0.662-1.253s-0.348-2.542-0.48-2.96c-0.253-0.791,0.994-3.621,1.343-4.286                         c0.349-0.664,3.67-0.48,4.964-0.371c1.295,0.107,2.41,4,2.41,4S17.829,31.438,18.095,32c0.192,0,1.438-0.049,1.92,0                         c0.377-0.688-0.641-1.354-0.641-1.354l0.977-4.045c0,0-0.176-2.947-0.836-3.936c1.176,0.834,3.363-0.389,4.056-0.207                         c0.688,0.182,0.601,3.15,0.378,3.341s-0.536,0.718-0.536,0.718s0.484,0.961,0.752,1.5c1.048-0.154,0.581-1.49,0.581-1.49                         s0.4-3.851,0.256-4.467c-0.146-0.617-3.598-1.091-3.598-1.091s0.107-3.886-0.616-4.468c-0.385-0.309-0.653-1.891-0.627-3.413                         l6.351,3.479l-0.244-0.618c-0.885-2.804,1.932-4.257,1.185-6.146c-0.801-2.022-1.672-1.302-2.194-2.5                         c-0.004-0.004-0.006-0.009-0.008-0.013l0.004-0.001c-0.004-0.011-0.011-0.024-0.017-0.036l2.581-1.128l0.346,0.79l1.809-1.935                         L27.425,5.235z M19.317,1.799c0.723,1.809,3.717,1.339,4.292,2.654c0.632,1.445,0.114,1.794,0.446,2.911l-0.041,0.019                         c-1.416,0.508-5.394,2.153-5.52,2.164c0-0.001,0.244-0.076,0-0.002c-0.244,0.075-0.097-0.514-0.049-0.563                         c0.895-0.222,1.113-0.331,0.723-0.885c0.021-0.033,0.15-0.181,0.164-0.263c0.014-0.083-0.07-0.08-0.07-0.08s0.06-0.014,0.082-0.094                         c0.023-0.078-0.168-0.31-0.168-0.31s0.278-0.146,0.312-0.275c0.033-0.129-0.738-0.643-0.751-0.771                         c-0.015-0.127,0.067-0.214,0.088-0.252c0.019-0.038-0.019-0.369-0.479-0.779L19.317,1.799z M26.19,10.355                         c0.583,1.331-1.864,3.238-0.936,5.019l-5.076-2.79c0.074-1.164,0.344-2.202,0.896-2.472c1.343-0.653,2.567-1.71,3.354-1.491                         c0.104-0.015,0.19-0.052,0.268-0.105C25.181,9.056,25.677,9.182,26.19,10.355z" />
                        </G>
                    </Svg>
                );
        case SCORPIO:
            return (
                <Svg
                    width={props?.width ? props?.width: 800}
                    height={props?.height? props?.height: 800}
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    {...props}
                >
                    <G id="Layer_2" data-name="Layer 2">
                    <G id="horoscope">
                        <Path d="M45.4,37.6l-4-4a2,2,0,0,0-2.8,2.8l.6.6H38a2,2,0,0,1-2-2V10A7,7,0,0,0,24,5.1a7,7,0,0,0-10,0A7,7,0,0,0,2,10v5a2,2,0,0,0,4,0V10A2.9,2.9,0,0,1,9,7a2.9,2.9,0,0,1,3,3V34a2,2,0,0,0,4,0V10a3,3,0,0,1,6,0V34a2,2,0,0,0,4,0V10a3,3,0,0,1,6,0V35a6,6,0,0,0,6,6h1.2l-.6.6a1.9,1.9,0,0,0,0,2.8,1.9,1.9,0,0,0,2.8,0l4-4A1.9,1.9,0,0,0,45.4,37.6Z" />
                    </G>
                    </G>
                </Svg>
            );
        case TAURUS:
            return (
                <Svg
                    fill={fillColor}
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={props?.width ? props?.width: 800}
                    height={props?.height? props?.height: 800}
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    {...props}
                >
                    <G>
                    <Path d="M0.328,25.705h20.479c0.078-0.971,0.084-1.092,0.063-1.213c0,0,0.128-1.58,1.84-3.742c0.364,0.146,3.336,0.564,4.247,1.736 c0.833,1.002,3.308-1.271,3.289-2.307c-0.021-1.033-1.529-1.566-1.66-2.539c-0.238-1.765,0.098-2.715-0.508-3.984 c-0.606-1.271-1.467-1.25-1.699-1.387c0.117-2.031,1.558-4.422,5.646-3.559c-4.693-4.104-8.738,0.83-8.499,3.772 c-0.71-2.2,0.332-5.41,3.928-5.817c-5.156-1.445-7.149,1.833-6.817,6.267c0,1.915-6.346,6.194-13.237,5.082 C-1.735,16.26,0.039,23.147,0.328,25.705z M25.05,15.535c0-0.523,0.404-0.742,1.071-0.742s1.186,0.315,1.186,0.839 c0,0.524-0.562,0.786-1.229,0.786C25.412,16.417,25.05,16.057,25.05,15.535z" />
                    </G>
                </Svg>
            );
        case VIRGO:
            return (
                <Svg
                    fill={fillColor}
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={props?.width ? props?.width: 800}
                    height={props?.height? props?.height: 800}
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    {...props}
                >
                    <G>
                    <Path d="M31.882,17.006c0.498-2.979-0.598-5.78-2.931-7.495c-1.225-0.9-2.631-1.364-3.889-1.354V6.654 c0-3.987-3.293-4.659-5.371-4.659c-1.394,0-2.688,0.524-3.65,1.479c-0.002,0.002-0.003,0.004-0.005,0.006 c-1.021-0.974-2.374-1.485-3.689-1.485c-1.39,0-2.686,0.524-3.648,1.479C8.691,3.48,8.685,3.492,8.678,3.499 C7.693,2.677,6.464,2.231,5.26,2.231c-1.392,0-2.688,0.524-3.65,1.479C0.876,4.439,0,5.761,0,7.909C0,8.888,0.792,9.68,1.772,9.68 c0.979,0,1.772-0.792,1.772-1.771c0-1.979,1.312-2.133,1.715-2.133c0.843,0,1.827,0.558,1.827,2.133v14.99 c0,0.979,0.793,1.771,1.772,1.771s1.772-0.793,1.772-1.771V7.671c0-1.979,1.544-2.129,1.968-2.129c0.424,0,1.877,0.113,1.877,2.41 c0,2.871-0.045,14.946-0.045,14.946c0,0.979,0.792,1.771,1.772,1.771c0.979,0,1.772-0.793,1.772-1.771V7.671 c0-1.979,1.312-2.132,1.715-2.132c0.843,0,1.828,0.557,1.828,2.132c0,0,0.051,16.173,0.049,17.226 c-1.44,0.844-2.838,1.396-3.893,1.596c-0.962,0.182-1.595,1.107-1.414,2.07c0.161,0.85,0.904,1.442,1.74,1.442 c0.107,0,0.221-0.012,0.33-0.03c1.422-0.271,3.402-1.045,5.418-2.277c1.896,0.971,4.486,1.439,5.799,1.627 c0.956,0.129,1.867-0.537,2.004-1.504c0.139-0.971-0.533-1.867-1.504-2.006c-1.008-0.146-2.057-0.375-2.951-0.627 C29.413,23.065,31.33,20.307,31.882,17.006z M25.12,22.188c0.002-0.781,0.005-1.646,0.009-2.549c0.01-2.867,0.021-6.07,0.021-7.956 c0.397,0.02,1.146,0.219,1.877,0.819c0.662,0.543,1.718,1.775,1.359,3.918C28.02,18.623,26.734,20.587,25.12,22.188z" />
                    </G>
                </Svg>
            );
        default:
            return (<></>)
    }
    
}
 