export const constructPagination = ({
  page = "1",
  pageSize = "10",
}: {
  page?: string;
  pageSize?: string;
}) => {
  const skip = (+page - 1) * +pageSize;
  const take = (+page - 1) * +pageSize + +pageSize;

  return { skip, take };
};
