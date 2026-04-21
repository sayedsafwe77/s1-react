import type { PaginationButtonsProps } from "../types/basic";

function PaginationButtons({noOfPags,onClick,skip,limit}: PaginationButtonsProps){
    return (
        <>
        <div className="pagination">
            {Array.from({length: noOfPags}, (_, i) => (
              <button key={i} onClick={onClick} className={i === skip/limit ? 'active': ''}>{i+1}</button>
            ))}
          </div>
        </>
    )
}
export default PaginationButtons;