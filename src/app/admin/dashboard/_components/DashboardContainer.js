"use client";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import RecentUserTable from "./RecentUserTable";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import { Skeleton } from "antd";
import BookingTable from "../../booking-management/_Component/BookingTable";

export default function DashboardContainer() {
  const { data, isLoading, isError } = useGetDashboardDataQuery();

  if (isLoading)
    return (
      <div className="space-y-20">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 2xl:grid-cols-2">
          <Skeleton.Button
            active={true}
            size={"100px"}
            shape={"square"}
            style={{ height: "120px" }}
            block={true}
          />
          <Skeleton.Button
            active={true}
            size={"100px"}
            shape={"square"}
            style={{ height: "120px" }}
            block={true}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 2xl:grid-cols-2">
          <Skeleton.Button
            active={true}
            size={"100px"}
            shape={"square"}
            style={{ height: "320px" }}
            block={true}
          />
          <Skeleton.Button
            active={true}
            size={"100px"}
            shape={"square"}
            style={{ height: "320px" }}
            block={true}
          />
        </div>
      </div>
    );

  // Dummy Data
  const userStats = [
    {
      key: "services",
      title: "Total services",

      count: data?.data?.totalService || 0,
    },
    {
      key: "total-bookings",
      title: "Total Bookings",

      count: data?.data?.totalBooking || 0,
    },
    {
      key: "earning",
      title: "Total Earnings",

      count: data?.data?.totalRevenue || 0,
    },
  ];
  return (
    <div className="space-y-20">
      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3 2xl:grid-cols-3">
        {userStats?.map((stat) => (
          <div
            key={stat.key}
            className="gap-x-4 rounded-2xl bg-[#FFFFFF] p-5 text-black shadow-sm"
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-dmSans text-lg font-medium">{stat.title}</p>
                <h5 className="mt-0.5 text-3xl font-semibold text-black">
                  {stat.key !== "earning" ? (
                    <CustomCountUp end={stat.count} />
                  ) : (
                    <span>
                      $ <CustomCountUp end={stat.count} />
                    </span>
                  )}
                </h5>
              </div>
            </div>

            {/* <div className="flex items-center gap-5">
              <h1 className=" text-[#4BB54B] text-xl font-bold flex items-center gap-2 bg-[#4BB54B1A] p-1 mt-2 rounded-lg">
                <span><PiArrowsOutSimple /></span>
                <span>4%</span>
              </h1>
              <h1 className=" text-xl">From the last month</h1>
            </div> */}
          </div>
        ))}
      </section>

      {/* Charts */}

      {/* Recent Users Table */}
      <section>
        <BookingTable limit={5} />
      </section>
    </div>
  );
}
