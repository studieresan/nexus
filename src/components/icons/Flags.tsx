import { Country, LanguageCode } from "@/models/Lang"

interface FlagProps {
  size?: string
  className?: string
  fill?: string
  style?: React.CSSProperties
}

export function SwedishFlag ({ size = '1.5em', className, fill, style }: FlagProps) {
  return (
    <svg
      className={className} style={{ ...style }} viewBox='0 0 36 36' width={size} height={size}
    >
      <path fill='#006AA7' d='M15.5 31H32c2.209 0 4-1.791 4-4.5v-6H15.5V31zM32 5H15.5v10.5H36V9c0-2.209-1.791-4-4-4zM10.5 5H4C1.792 5 .002 6.789 0 8.997V15.5h10.5V5zM0 20.5v6.004C.002 29.211 1.792 31 4 31h6.5V20.5H0z' /><path fill='#FECC00' d='M15.5 5h-5v10.5H0v5h10.5V31h5V20.5H36v-5H15.5z' />
    </svg>
  )
}

export function NorwegianFlag ({ size = '1.5em', className, fill, style }: FlagProps) {
  return (
    <svg
      className={className} style={{ ...style }} viewBox='0 0 36 36' width={size} height={size}
    >
      <path fill='#EF2B2D' d='M10 5H4C1.791 5 0 6.791 0 9v6h10V5zm22 0H16v10h20V9c0-2.209-1.791-4-4-4zM10 31H4c-2.209 0-4-1.791-4-4v-6h10v10zm22 0H16V21h20v6c0 2.209-1.791 4-4 4z' /><path fill='#002868' d='M14.5 5h-2.944l-.025 11.5H0v3h11.525L11.5 31h3V19.5H36v-3H14.5z' /><path fill='#EEE' d='M14.5 31H16V21h20v-1.5H14.5zM16 5h-1.5v11.5H36V15H16zm-4.5 0H10v10H0v1.5h11.5zM0 19.5V21h10v10h1.5V19.5z' />
    </svg>
  )
}

export function FinnishFlag ({ size = '1.5em', className, fill, style }: FlagProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' style={{ ...style }} className={className} viewBox='0 0 36 36' width={size} height={size}>
      <path fill='#EDECEC' d='M32 5H18v10h18V9c0-2.209-1.791-4-4-4z' /><path fill='#EEE' d='M11 5H4C1.791 5 0 6.791 0 9v6h11V5z' /><path fill='#EDECEC' d='M32 31H18V21h18v6c0 2.209-1.791 4-4 4zm-21 0H4c-2.209 0-4-1.791-4-4v-6h11v10z' /><path fill='#003580' d='M18 5h-7v10H0v6h11v10h7V21h18v-6H18z' />
    </svg>
  )
}

export function AmericanFlag ({ size = '1.5em', className, fill, style }: FlagProps) {
  return (
    <svg
      className={className} style={{ ...style }} viewBox='0 0 36 36' width={size} height={size}
    >
      <path fill='#B22334' d='M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z' /><path fill='#EEE' d='M.068 27.679c.017.093.036.186.059.277.026.101.058.198.092.296.089.259.197.509.333.743L.555 29h34.89l.002-.004c.135-.233.243-.483.332-.741.034-.099.067-.198.093-.301.023-.09.042-.182.059-.275.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9c0-.233.03-.457.068-.679C.028 8.542 0 8.767 0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297-.034.098-.066.196-.092.297zM18 9h18c0-.233-.028-.459-.069-.68-.017-.092-.035-.184-.059-.274-.027-.103-.059-.203-.094-.302-.089-.258-.197-.507-.332-.74.001-.001 0-.003-.001-.004H18v2z' /><path fill='#3C3B6E' d='M18 5H4C1.791 5 0 6.791 0 9v10h18V5z' /><path fill='#FFF' d='M2.001 7.726l.618.449-.236.725L3 8.452l.618.448-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449-.236.725.617-.448.618.448-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 9l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L5 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L9 13l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449-.236.725L7 8.452l.618.448-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 7l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448-.236-.725.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 11l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448-.236-.725.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L11 15l-.235.726zm4 0l.618.449-.236.725.617-.448.618.448-.236-.725.618-.449h-.764L15 15l-.235.726z' />
    </svg>
  )
}

export function GreatBritainFlag ({ size = '1.5em', className, fill, style }: FlagProps) {
  return (
    <svg
      className={className + ' rounded'} style={{ ...style }} viewBox='0 0 640 480' width={size} height={size}
    >
      <path fill='#012169' d='M0 0h640v480H0z' />
      <path fill='#FFF' d='m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z' />
      <path fill='#C8102E' d='m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z' />
      <path fill='#FFF' d='M241 0v480h160V0H241zM0 160v160h640V160H0z' />
      <path fill='#C8102E' d='M0 193v96h640v-96H0zM273 0v480h96V0h-96z' />

    </svg>
  )
}

// For more languages, add more objects here
export const flagAndCountry: Record<LanguageCode, Country> = {
  sv: { icon: <SwedishFlag />, code: 'sv', text: 'Svenska' },
  no: { icon: <NorwegianFlag />, code: 'no', text: 'Norsk' },
  fi: { icon: <FinnishFlag />, code: 'fi', text: 'Suomalainen' },
  en: { icon: <GreatBritainFlag />, code: 'en', text: 'English' }
}
