# === GIT ALIASES UNTUK DEVELOPMENT ===
# Tambahkan ke ~/.gitconfig atau jalankan git config --global

# Status dan info
git config --global alias.st "status"
git config --global alias.s "status --porcelain"
git config --global alias.br "branch"
git config --global alias.co "checkout"

# Commit yang aman
git config --global alias.ca "commit --amend"
git config --global alias.cm "commit -m"

# Log yang cantik
git config --global alias.lg "log --oneline --graph --decorate"
git config --global alias.last "log -1 HEAD --stat"

# Diff yang berguna
git config --global alias.d "diff"
git config --global alias.dc "diff --cached"
git config --global alias.dn "diff --name-only"

# Reset yang aman
git config --global alias.unstage "reset HEAD"
git config --global alias.rs "reset HEAD"

# Branch management
git config --global alias.new "checkout -b"
git config --global alias.current "branch --show-current"
