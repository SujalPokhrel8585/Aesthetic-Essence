# One-off: bulk brand text replacement across the repo.
$ErrorActionPreference = 'Stop'
$files = Get-ChildItem -Recurse -File -Include *.tsx,*.ts,*.html,*.md,*.txt,*.js,*.json,*.xml |
  Where-Object { $_.FullName -notmatch 'node_modules|\.git|dist|\.nav-shots' }
# Ordered: longest phrases first. Keys must be unique (case-insensitive).
$pairs = [ordered]@{
  'lotus-skin' = 'ae-skin'
  'Lotus Skin and Hair Clinic' = 'AestheticEssence Skin and Hair Clinic'
  'Lotus Skin & Hair Clinic' = 'AestheticEssence Skin & Hair Clinic'
  'lotusskinandhair.com.np' = 'aestheticessence.com.np'
  'Lotus Botanical Clinical' = 'AestheticEssence Gold Clinical'
  'Lotus Teal' = 'AestheticEssence Gold'
  'lotus-theme' = 'ae-theme'
  'lotus-perf-tier' = 'ae-perf-tier'
  'lotus-v1' = 'ae-v1'
  'Lotus Clinic' = 'AestheticEssence Clinic'
  'Boudha' = 'Samakhushi'
  'Lotus' = 'AestheticEssence'
  'lotus-' = 'ae-'
}
$then = 'ae'
$count = 0
foreach ($f in $files) {
  $c = Get-Content $f.FullName -Raw
  $n = $c
  foreach ($k in $pairs.Keys) { $n = $n.Replace($k, $pairs[$k]) }
  if ($n -ne $c) { Set-Content $f.FullName $n -NoNewline; $count++ }
}
# remaining lowercase 'lotus' not caught by the ordered phrases above
foreach ($f in $files) {
  $c = Get-Content $f.FullName -Raw
  if ($c -match 'lotus') { Set-Content $f.FullName ($c -replace 'lotus', $then) -NoNewline; $count++ }
}
"updated $count files"
