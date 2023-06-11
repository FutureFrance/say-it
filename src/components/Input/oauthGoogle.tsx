type IProps = {
  text: string;
}

const OAuthGoogle = ({ text }: IProps) => {
  return (
    <div className='w-full inline-block text-center border-[3px] border-black-400 py-1 mb-[10px]'>
      <a className='flex items-center' href={`${process.env.API_URL}/api/auth/google`}>
        <img className='ml-[7%] w-[25px] h-[25px]' src="/assets/google_logo_oauth.png" alt="google_logo" />
        <div className='w-[100%] flex justify-center'>
          <p className='max-w-max max-h-min p-0 text-sm font-medium text-slate-700'>{text}</p>
        </div>
      </a>
    </div>
  )
}

export default OAuthGoogle;