{ pkgs }: {
    deps = [
      pkgs.vite
      pkgs.nodejs-16_x
      pkgs.nodePackages.yarn
      pkgs.replitPackages.jest
    ];
}