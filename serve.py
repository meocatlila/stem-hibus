#!/usr/bin/env python3
"""Serve the demo on both IPv4 and IPv6.

Browsers resolve localhost to ::1 first. A server bound only to 0.0.0.0
answers 127.0.0.1 and leaves ::1 refused, so Firefox and Chrome stop
before they try IPv4.
"""

import argparse
import socket
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class DualStackServer(ThreadingHTTPServer):
    address_family = socket.AF_INET6
    daemon_threads = True

    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()

    def handle_error(self, request, client_address):
        # A browser that disconnects mid-response should not dump a traceback.
        return


def make_handler(directory):
    class DemoHandler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=directory, **kwargs)

        def end_headers(self):
            # Judges refresh the same URL between rehearsals. Do not keep old map labels.
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
            self.send_header("Pragma", "no-cache")
            super().end_headers()

    return DemoHandler


def main():
    parser = argparse.ArgumentParser(description="Serve the HIBUS demo.")
    parser.add_argument("--port", type=int, default=8741)
    parser.add_argument("--directory", default=".")
    args = parser.parse_args()
    handler = make_handler(args.directory)
    server = DualStackServer(("::", args.port), handler)
    print(f"HIBUS demo on http://localhost:{args.port}/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
