function SiderLink({ Icon, name, mdisplay='hidden' }) {
  return (
    <div className=" text-white flex space-x-3 hoverAnimation ">
      <Icon className="h-8   " />
      <span className={`${mdisplay} xl:inline   lg:text-2xl`}>{name}</span>
    </div>
  );
}

export default SiderLink;
