import Link from "next/link";

type IProps = {
  urlTarget: string;
  imgSource: string;
  optionText: string;
  styles?: string;
}

export const MenuOption = ({ urlTarget, imgSource, optionText, styles = "hover:bg-neutral-800 hover:rounded-full p-2 flex items-center gap-4" }: IProps) => {
  return (
    <Link href={urlTarget} className="max-w-min">
      <div className={styles}>
        <img className="max-w-[25px] max-h-[25px]" src={imgSource} alt="" />
        <p>{optionText}</p>
      </div>
    </Link>
  )
}

export default MenuOption;