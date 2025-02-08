function AutoComplete(props) {
  const {autoCompleteList, setInputWords} = props;

  return (
    <>
      <div className="absolute top-full max-h-80 w-full text-sm z-50 overflow-scroll whitespace-nowrap bg-white rounded-lg">
        <div className="join join-vertical">
          {autoCompleteList.map((obj) => {
              return(
                <div key={`autoCompleteItem-${obj.id}`}>
                  <p className="p-2 border join-item text-gray-600 hover:text-black hover:bg-gray-300"
                    onMouseDown={() => setInputWords(obj.name)}
                    >{obj.name}</p>
                </div>
              )
          })}
        </div>
      </div>
    </>
  )
}

export default AutoComplete;
