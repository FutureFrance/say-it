const NoDataInfo = ({ text }: { text: string }) => {
  return (
    <div>
      <div className="flex justify-center mb-4">
        <img src="/assets/no-data_icon.png"/>
      </div>

      <p className="font-normal text-sm lg:text-md">{text}</p>
    </div>
  )
}

export default NoDataInfo;