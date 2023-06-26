import Link from "next/link";

type IProps = {
  urlTarget: string;
  imgSource: string;
  optionText: string;
}

export const MenuOption = ({ urlTarget, imgSource, optionText }: IProps) => {
  return (
    <Link href={urlTarget}>
      <div className="hover:bg-[gray] hover:rounded-full flex items-center gap-4">
        <img className="max-w-[25px] max-h-[25px]" src={imgSource} alt="" />
        <p>{optionText}</p>
      </div>
    </Link>
  )
}

export default MenuOption;