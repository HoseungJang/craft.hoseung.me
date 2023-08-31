import { css } from "@emotion/css";
import {
  Fragment,
  ReactNode,
  Ref,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { OverlayComponent } from "../../models/overlay";
import { scrollLock } from "utils/scroll";

interface OverlayContext {
  mount: (id: string, element: ReactNode) => void;
  unmount: (id: string) => void;
}

const Context = createContext<OverlayContext | null>(null);

export function OverlayProvider({ children }: { children?: ReactNode }) {
  const [overlayById, setOverlayById] = useState<Map<string, ReactNode>>(() => new Map());

  const mount = useCallback((id: string, node: ReactNode) => {
    setOverlayById((prev) => {
      prev.set(id, node);
      return new Map(prev);
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlayById((prev) => {
      prev.delete(id);
      return new Map(prev);
    });
  }, []);

  return (
    <Context.Provider value={useMemo(() => ({ mount, unmount }), [mount, unmount])}>
      {children}
      {Array.from(overlayById.entries()).map(([id, node]) => (
        <Fragment key={id}>{node}</Fragment>
      ))}
    </Context.Provider>
  );
}

export function useOverlay() {
  const context = useContext(Context);

  if (context == null) {
    throw new Error("useOverlay should be called inside OverlayProvider");
  }

  const { mount, unmount } = context;

  const id = useMemo(() => Date.now().toString(), []);

  const ref = useRef<OverlayControllerRef>(null);

  return useMemo(
    () => ({
      open: (component: OverlayComponent) => {
        mount(id, <OverlayController key={Date.now()} component={component} ref={ref} />);
      },
      close: () => {
        ref.current?.close();
      },
    }),
    [id, mount, unmount]
  );
}

interface OverlayControllerProps {
  component: OverlayComponent;
}

interface OverlayControllerRef {
  close: () => void;
}

const OverlayController = forwardRef(
  ({ component: Component }: OverlayControllerProps, ref: Ref<OverlayControllerRef>) => {
    const [isOpen, setIsOpen] = useState(true);
    const close = useCallback(() => setIsOpen(false), []);

    useImperativeHandle(ref, () => ({ close }));

    useEffect(() => {
      if (!isOpen) {
        return;
      }

      const unlock = scrollLock();
      return () => unlock();
    }, [isOpen]);

    return (
      <div
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;

          width: 100%;
          height: 100%;

          pointer-events: ${isOpen ? "auto" : "none"};
        `}
      >
        <Component isOpen={isOpen} />
      </div>
    );
  }
);
