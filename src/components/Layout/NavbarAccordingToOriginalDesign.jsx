import React, { useMemo, useState } from "react";
import Logo from "../../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import useAuth from "../hooks/useAuth";
import { UnstyledButton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const NavbarAccordingToOriginalDesign = () => {
  const [active, setActive] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const { navigate } = useNavigate();
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const links = useMemo(() => {
    return [
      {
        name: "Home",
        link: "./",
      },
      {
        name: "Buy",
        link: "/properties",
      },
      {
        name: "Exchange",
        link: "/exchange",
      },
      {
        name: "Rent",
        link: "/rent",
      },
      {
        name: "News & Insights",
        link: "/blogs",
      },
    ];
  }, []);

  const buttons = useMemo(() => {
    return auth
      ? [
          {
            name: "Dashboard",
            link: "/dashboard",
            filled: true,
          },
          {
            name: "Logout",
            link: "/login",
            filled: false,
            onClick: () => {
              setAuth(false);
            },
          },
        ]
      : [
          {
            name: "Login",
            link: "/login",
            filled: true,
          },
          {
            name: "Sign Up",
            link: "/register",
            filled: false,
          },
        ];
  }, [auth]);

  return (
    <nav className="bg-white sticky top-0 z-50 flex h-24 w-full items-center justify-between px-8 shadow-sm border-b border-gray-100 lg:px-12 xl:px-16">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Rayhaesh Logo" className="h-14 w-auto" />
        </Link>
      </div>
      <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.link}
            className={`relative px-5 py-3 text-lg font-medium transition-all duration-200 ${
              active === link.name
                ? "text-red-600 after:absolute after:top-[70%] after:left-1/2 after:transform after:-translate-x-1/2 after:w-[50px] after:h-[8px] after:block after:bg-[url('/src/assets/icons/active-link.png')] after:bg-contain after:bg-center after:bg-no-repeat after:content-[''] after:scale-75"
                : "text-gray-700 hover:text-red-600"
            }`}
            onClick={() => setActive(link.name)}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 mt-1 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 mt-1 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6">
            <div className="space-y-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.link}
                  className={`flex items-center px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                    active === link.name
                      ? "bg-red-50 text-red-600 border-l-4 border-red-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                  }`}
                  onClick={() => {
                    setActive(link.name);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="ml-2">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                {!auth ? (
                  <>
                    <Link
                      to="/login"
                      className="block w-full px-4 py-3 text-center text-red-600 border-2 border-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full px-4 py-3 text-center bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="block w-full px-4 py-3 text-center bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setAuth(false);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full px-4 py-3 text-center text-red-600 border-2 border-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="hidden lg:flex items-center space-x-3">
        {buttons.map((button, index) => (
          <Link
            key={index}
            to={button.link}
            onClick={() => {
              button.onClick ? button.onClick() : setActive(button.name);
            }}
            className={cn(
              "inline-flex items-center justify-center px-5 py-2.5 text-base font-medium rounded-lg transition-all duration-200",
              button.filled
                ? "bg-red-600 text-white hover:bg-red-700 shadow-sm"
                : "text-red-600 border border-red-600 hover:bg-red-50"
            )}
          >
            {button.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavbarAccordingToOriginalDesign;
