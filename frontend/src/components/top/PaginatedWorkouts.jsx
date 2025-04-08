import { useEffect, useState } from "react";
import { putDev } from "../../utils/devTool";
import Workouts from "./Workouts";
import ReactPaginate from 'react-paginate';

export default function PaginatedWorkouts(props) {
  const {
    itemsPerPage,
    workouts,
    isOnlyLiked,
    searchWords,
    filterQuery,
  } = props;

  // ページ先頭要素のIndex
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(0);
  // ページの末尾要素のIndex
  const endOffset = itemOffset + itemsPerPage;
  putDev(`Loading items from ${itemOffset} to ${endOffset}`);

  // ページに表示するWorkouts Object
  const currentWorkouts = workouts.slice(itemOffset, endOffset);
  // 全ページ数
  const allPageCount = Math.ceil(workouts.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % workouts.length;
    putDev(`User requested page number ${e.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
    setPage(e.selected);
  };

  useEffect(() => {
    setItemOffset(0);
    setPage(0);
  }, [isOnlyLiked, searchWords, filterQuery])

  return(
    <>
      <Workouts workouts={currentWorkouts} />

      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        forcePage={page}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={allPageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName    ={"join my-4 max-w-full flex justify-center flex-wrap"}
        pageLinkClassName     ={"join-item btn btn-sm sm:btn-md"}
        previousLinkClassName ={"join-item btn btn-sm sm:btn-md"}
        nextLinkClassName     ={"join-item btn btn-sm sm:btn-md"}
        breakLinkClassName={"join-item btn btn-ghost btn-sm lg:btn-md"}
        activeLinkClassName={"bg-indigo-600 text-gray-300"}
        disabledLinkClassName={"btn-disabled"}
      />
    </>
  )
}
