import { FC, SetStateAction, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import styles from "./Pagination.module.css";

type TTotalPosts = {
  totalPosts: number;
  paginate: (currentPage: SetStateAction<number>) => void;
};

const Pagination: FC<TTotalPosts> = ({ totalPosts, paginate }) => {
  const { postsPage } = useAppSelector((state) => state.postReducer);
  const [activeIndex, setActiveIndex] = useState<number>(Number);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / Number(postsPage)); i++) {
    pageNumbers.push(i);
  }

  const onClick = (index: number, number: number) => {
    paginate(number);
    setActiveIndex(index);
  };

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map((number, index) => (
        <li className={styles.pageItem} key={index}>
          <a
            href="#"
            className={
              activeIndex === index
                ? `${styles.pageLink} ${styles.pageLinkActive}`
                : styles.pageLink
            }
            onClick={(e) => onClick(index, number)}
          >
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
