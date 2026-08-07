function Container({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default Container
