type HeroProps = {
  header: string,
  highlight: string,
  body: string,
  image: string
}

export default function Hero({ header, highlight, body, image }: HeroProps) {
  return (
    <div
      className="relative w-full h-[625px] bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-start p-8 2xl:container">
        <h1 className="text-[64px] leading-[80px] font-bold text-white">{header}</h1>
        <h2 className="text-[64px] leading-[80px] font-bold text-[#1b5e20] bg-[#8BC34A] px-2">{highlight}</h2>
        <p className="mt-4 text-lg text-white w-2/3">
          {body}
        </p>
      </div>
    </div>
  )
}