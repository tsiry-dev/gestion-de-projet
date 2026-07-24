import { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { LiaClipboardListSolid } from "react-icons/lia";
import { GoProject } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import SidebarLink from "./ui/sidebar-link";
import SidebarTitle from "./ui/sidebar-title";
import { IoMdAdd } from "react-icons/io";
import Button from "./ui/button";
import useGetAllProject from "@/modules/projects/hooks/useGetAllProjects";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { Dialog } from "./dialog";
import { onCloseCreateProject, onOpeCreateProject, onOpenProjectDetail } from "@/app/store/features/projectSlice";
import NewProject from "@/modules/projects/components/new-project";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { HiOutlineTrash } from "react-icons/hi2";




export default function AdminSidebar() {

   const [open, setOpen] = useState(false);

   const {data, isPending} = useGetAllProject();
   const { isCreateProject } = useSelector((state: RootState) => state.projects);
   const dispatch = useDispatch();

  return (
    <>
      {/* Mobile button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed top-4 left-4 z-50
          rounded-lg bg-white border border-gray-300
          px-2 py-1
          md:hidden
        "
      >
        <VscLayoutSidebarLeftOff size={16} />
      </button>


      {/* Overlay mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/40
            md:hidden
          "
        />
      )}


    <aside
    className={`
        fixed
        inset-y-0
        left-0
        z-50

        w-64
        h-screen
        shrink-0

        bg-white
        border-r
        border-gray-200

        flex
        flex-col

        transition-transform
        duration-300
        ease-in-out

        ${open ? "translate-x-0" : "-translate-x-full"}

        md:translate-x-0
    `}
    >

        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">
              TaskFlow
            </h1>
            <p className="text-sm text-gray-500">
              Project Management
            </p>
        </div>


        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">

          <div>
            <SidebarTitle>
              Menu
            </SidebarTitle>

            <div className="space-y-1">
              <SidebarLink to={"/admin/dashboard"}>
                <RxDashboard size={12}/> &nbsp;
                Dashboard
              </SidebarLink>

              <SidebarLink to={"/admin/projects"}>
                <GoProject size={12}/> &nbsp;
                Projects
              </SidebarLink>

              <SidebarLink to={"/admin/tasks"}>
                <HiOutlineTrash size={12}/> &nbsp;
                Corbaille
              </SidebarLink>

              <SidebarLink to={"/admin/teams"}>
                <FaRegUser size={12}/> &nbsp;
                Team
              </SidebarLink>
            </div>
          </div>


          {/* Projects */}
          <div>

            <div className="flex items-center justify-between mb-3">

              <SidebarTitle>
                Projets
              </SidebarTitle>

              <Button onClick={() => dispatch(onOpeCreateProject())}>
                <IoMdAdd />
              </Button>

            </div>


            {isPending && (
              <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 rounded-lg"
                  >
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            )}


            <div className="space-y-1">
              {data?.projects.slice(0,5).map((project)=>(
                <div
                  key={project._id}
                  onClick={()=>{
                    dispatch(onOpenProjectDetail(project._id));
                    setOpen(false);
                  }}
                  className="
                    cursor-pointer
                    flex items-center justify-between
                    px-3 py-2
                    text-sm text-gray-600
                    hover:text-gray-900
                    hover:bg-gray-50
                    rounded-lg
                  "
                >
                  <span className="truncate">
                    {project.title}
                  </span>

                  <span className="text-xs text-gray-400">
                    {project.taskCount}
                  </span>

                </div>
              ))}
            </div>


            <NavLink
              to="/admin/projects"
              className="
                block w-full mt-2
                px-3 py-2
                text-sm text-blue-600
                hover:bg-blue-50
                rounded-lg
                text-center
              "
            >
              View all projects →
            </NavLink>

          </div>


          {/* User */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center px-3 py-2">

              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  JD
                </span>
              </div>

              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  John Doe
                </p>

                <p className="text-xs text-gray-500">
                  john@example.com
                </p>
              </div>

            </div>
          </div>

        </nav>



      </aside>
    </>
  )
}