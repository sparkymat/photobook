import React, { useCallback } from 'react';
import { NavLink } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { IconCalendar } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { selectPath } from '../../store/selectors';
import { updatePath } from '../../slices/App';
import { AppDispatch } from '../../store';

interface Path {
  href: string;
  label: string;
  icon?: React.JSX.Element;
}

interface PathGroup {
  label: string;
  icon: React.JSX.Element;
  paths: Path[];
}

export interface PathNavLinksProps {
  collapsed: boolean;
  toggleNav(): void;
}

export const PathNavLinks = ({ toggleNav, collapsed }: PathNavLinksProps) => {
  const currentPath = useSelector(selectPath);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onNavClick = useCallback(
    (p: string) => {
      dispatch(updatePath(p));
      navigate(p);
      toggleNav();
    },
    [dispatch, navigate, toggleNav],
  );

  const isActive = useCallback(
    (path: string): boolean => currentPath === path,
    [currentPath],
  );

  const pathEntries: (Path | PathGroup)[] = [
    {
      href: '/',
      label: 'Recent',
      icon: <IconCalendar stroke={1} />,
    },
  ];

  return (
    <>
      {pathEntries.map(pe =>
        (pe as PathGroup).paths !== undefined ? (
          <NavLink
            key={pe.label}
            label={pe.label}
            variant="subtle"
            tt="uppercase"
            leftSection={(pe as PathGroup).icon}
            childrenOffset={20}
          >
            {(pe as PathGroup).paths.map(c => (
              <NavLink
                key={c.label}
                label={c.label}
                active={isActive(c.href)}
                variant="subtle"
                tt="uppercase"
                onClick={() => onNavClick(c.href)}
              />
            ))}
          </NavLink>
        ) : (
          <NavLink
            key={pe.label}
            label={collapsed ? undefined : pe.label}
            active={isActive((pe as Path).href)}
            variant="subtle"
            tt="uppercase"
            leftSection={(pe as Path).icon}
            onClick={() => onNavClick((pe as Path).href)}
          />
        ),
      )}
    </>
  );
};
