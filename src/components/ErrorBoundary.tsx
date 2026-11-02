import { Component, type ErrorInfo, type ReactNode } from "react";
import { clearSave } from "../engine/save";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  private handleReset = () => {
    clearSave(true);
    window.location.href = window.location.origin + window.location.pathname;
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#0d0907] text-[#f7f0e3] flex flex-col items-center justify-center p-6 text-center select-none z-50">
          <div className="max-w-md w-full bg-[#1e1511] border-2 border-red-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <span className="text-5xl mb-3 inline-block">⚠️</span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-red-400 mb-2">
              Đã xảy ra sự cố hiển thị
            </h1>
            <p className="text-stone-300 font-serif text-sm mb-4 leading-relaxed">
              Trò chơi gặp lỗi không mong muốn trong quá trình kết xuất giao diện. Bộ sưu tập tư liệu của bạn vẫn được lưu giữ an toàn.
            </p>

            {this.state.error && (
              <div className="p-3 mb-5 rounded bg-black/60 border border-stone-800 text-left text-xs font-mono text-red-300/90 overflow-x-auto max-h-32">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 font-medium text-sm transition cursor-pointer"
              >
                Tải lại trang
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-900/90 hover:bg-red-800 text-white font-semibold text-sm transition cursor-pointer shadow-md"
              >
                Khôi phục & Chơi lại
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
